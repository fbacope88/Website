import { Router } from "express";
import nodemailer from "nodemailer";
import { logger } from "../lib/logger.js";

const router = Router();

async function notifyMake(data: Record<string, unknown>) {
  const url = process.env["MAKE_WEBHOOK_URL"];
  if (!url) return;
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch (err) {
    logger.error({ err }, "Failed to notify Make.com");
  }
}

router.post("/contact", async (req, res) => {
  const { name, email, message } = req.body as {
    name: string;
    email: string;
    message: string;
  };

  if (!name || !email || !message) {
    res.status(400).json({ error: "Name, email and message are required" });
    return;
  }

  const emailUser = process.env["EMAIL_USER"];
  const emailPass = process.env["EMAIL_PASS"];

  if (emailUser && emailPass) {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: emailUser, pass: emailPass },
      });

      await transporter.sendMail({
        from: emailUser,
        to: "creativewebstudioexpert@gmail.com",
        replyTo: email,
        subject: `New enquiry from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
            <h2 style="color:#0066FF">New Website Enquiry</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <hr style="border:1px solid #eee;margin:20px 0"/>
            <p><strong>Message:</strong></p>
            <p style="white-space:pre-wrap">${message}</p>
          </div>
        `,
      });
    } catch (err) {
      logger.error({ err }, "Failed to send email");
    }
  } else {
    logger.warn("EMAIL_USER or EMAIL_PASS not set — skipping email");
  }

  await notifyMake({
    event: "contact_form",
    name,
    email,
    firstName: name.split(" ")[0],
    message,
    tags: ["contact-form"],
  });

  res.json({ success: true });
});

export default router;

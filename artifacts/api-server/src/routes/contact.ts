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
  const { name, email, phone, businessName, websiteType, industry, timeline, message } = req.body as {
    name: string;
    email: string;
    phone?: string;
    businessName?: string;
    websiteType?: string;
    industry?: string;
    timeline?: string;
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

      const row = (label: string, value?: string) =>
        value ? `<tr><td style="padding:8px 0;color:#666;width:160px;vertical-align:top"><strong>${label}</strong></td><td style="padding:8px 0;color:#1a1a2e">${value}</td></tr>` : "";

      await transporter.sendMail({
        from: emailUser,
        to: "creativewebstudioexpert@gmail.com",
        replyTo: email,
        subject: `New enquiry from ${name}${businessName ? ` — ${businessName}` : ""}`,
        html: `
          <div style="font-family:sans-serif;max-width:620px;margin:0 auto;border:1px solid #eee;border-radius:12px;overflow:hidden">
            <div style="background:#0066FF;padding:24px 32px">
              <h2 style="color:#fff;margin:0;font-size:20px">New Website Enquiry</h2>
            </div>
            <div style="padding:32px">
              <table style="width:100%;border-collapse:collapse">
                ${row("Full Name", name)}
                ${row("Email", `<a href="mailto:${email}" style="color:#0066FF">${email}</a>`)}
                ${row("Phone", phone)}
                ${row("Business Name", businessName)}
                ${row("Package Interest", websiteType)}
                ${row("Industry", industry)}
                ${row("Timeline", timeline)}
              </table>
              <hr style="border:none;border-top:1px solid #eee;margin:20px 0"/>
              <p style="color:#666;margin:0 0 8px 0"><strong>Project Details:</strong></p>
              <p style="color:#1a1a2e;white-space:pre-wrap;background:#f9f9f9;padding:16px;border-radius:8px;margin:0">${message}</p>
            </div>
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
    phone,
    businessName,
    websiteType,
    industry,
    timeline,
    message,
    tags: ["contact-form"],
  });

  res.json({ success: true });
});

export default router;

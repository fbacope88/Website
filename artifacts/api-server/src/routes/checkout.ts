import { Router } from "express";
import Stripe from "stripe";
import { logger } from "../lib/logger.js";

const router = Router();

const stripe = new Stripe(process.env["STRIPE_SECRET_KEY1"] ?? "");

const PLANS = {
  basic: { name: "Basic Web Design Package", amount: 19900 },
  professional: { name: "Professional Web Design Package", amount: 39900 },
  ecommerce: { name: "E-Commerce Web Design Package", amount: 59900 },
} as const;

async function notifyMakePayment(data: Record<string, unknown>) {
  const url = process.env["MAKE_WEBHOOK_PAYMENT_URL"];
  if (!url) return;
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch (err) {
    logger.error({ err }, "Failed to notify Make.com payment webhook");
  }
}

router.post("/checkout", async (req, res) => {
  const { plan, name, email } = req.body as { plan: string; name?: string; email?: string };
  const planData = PLANS[plan as keyof typeof PLANS];

  if (!planData) {
    res.status(400).json({ error: "Invalid plan" });
    return;
  }

  const rawDomains = process.env["REPLIT_DOMAINS"] ?? "";
  const domain = rawDomains.split(",")[0]?.trim();
  const baseUrl = domain ? `https://${domain}` : "http://localhost:80";

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: { name: planData.name },
            unit_amount: planData.amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${baseUrl}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/payment-cancel`,
    });

    await notifyMakePayment({
      event: "payment_initiated",
      name: name ?? "",
      email: email ?? "",
      plan,
      amount: planData.amount / 100,
      currency: "GBP",
      sessionId: session.id,
      tags: ["paid-customer"],
    });

    res.json({ url: session.url });
  } catch (err) {
    req.log.error({ err }, "Stripe checkout error");
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});

export default router;

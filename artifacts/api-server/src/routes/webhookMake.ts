import { Router } from "express";

const router = Router();

router.post("/webhook/make", (req, res) => {
  req.log.info({ body: req.body }, "Make.com inbound webhook received");
  res.json({ received: true });
});

export default router;

import { Router, type IRouter } from "express";
import healthRouter from "./health";
import checkoutRouter from "./checkout";
import contactRouter from "./contact";
import webhookMakeRouter from "./webhookMake";

const router: IRouter = Router();

router.use(healthRouter);
router.use(checkoutRouter);
router.use(contactRouter);
router.use(webhookMakeRouter);

export default router;

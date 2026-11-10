import { Router, type IRouter } from "express";
import brandingRouter from "./branding";
import healthRouter from "./health";
import storageRouter from "./storage";

const router: IRouter = Router();

router.use(healthRouter);
router.use(brandingRouter);
router.use(storageRouter);

export default router;

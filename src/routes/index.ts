import { Router } from "express";
import indexCtrl from "../controllers";

const router = Router();

router.get("/", indexCtrl.index);

export default router;

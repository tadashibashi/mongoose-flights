import { Router } from "express";
import flights from "./routes/flights";
import index from "./routes/index";

const router = Router();

router.use("/", index);
router.use("/flights", flights);

export default router;

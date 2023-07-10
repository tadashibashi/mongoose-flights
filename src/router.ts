import { Router } from "express";
import flights from "./routes/flights";
import index from "./routes/index";
import tickets from "./routes/tickets";

const router = Router();

router.use("/", index);
router.use("/", tickets);
router.use("/flights", flights);


export default router;

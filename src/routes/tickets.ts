import { Router } from "express";
import ticketCtrl from "../controllers/tickets";

const router = Router();

router.get("/flights/:id/tickets/new", ticketCtrl.new);
router.post("/flights/:id/tickets/", ticketCtrl.create);
router.delete("/flights/:id/tickets/:ticketId", ticketCtrl.delete);

export default router;

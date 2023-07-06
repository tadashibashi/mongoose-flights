import { Router } from "express";
import flightsCtrl from "../controllers/flights";

const router = Router();

router.get("/", flightsCtrl.index);

router.get("/new", flightsCtrl.new);
router.post("/", flightsCtrl.create);

router.get("/edit/:id", flightsCtrl.edit);
router.put("/:id", flightsCtrl.update);

router.delete("/:id", flightsCtrl.delete);

router.get("/:id", flightsCtrl.show);

export default router;

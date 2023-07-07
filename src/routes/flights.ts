import { Router } from "express";
import flightsCtrl from "../controllers/flights";
import destCtrl from "../controllers/destinations";

const router = Router();

router.get("/", flightsCtrl.index);

router.get("/new", flightsCtrl.new);
router.post("/", flightsCtrl.create);

router.post("/:id/destination", destCtrl.create);

router.get("/edit/:id", flightsCtrl.edit);
router.put("/:id", flightsCtrl.update);

router.delete("/:id", flightsCtrl.delete);
router.delete("/:id/destination/:destId", destCtrl.delete);

router.get("/:id", flightsCtrl.show);



export default router;

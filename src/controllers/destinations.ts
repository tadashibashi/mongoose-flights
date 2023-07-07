import {Request, Response} from "express";
import {Flight} from "../models/Flight";
import {cleanseBody} from "./util";

async function _create(req: Request, res: Response) {
    const id = req.params["id"];

    const flight = await Flight.findById(id);
    if (flight) {
        cleanseBody(req.body);

        flight.destinations.push(req.body);
        flight.save();

        res.redirect("/flights/" + id);
    } else {
        console.error("Tried to find a flight with id: " + id +
            ", but it does not exist in db!");
        res.redirect("/flights");
    }
}

async function _delete(req: Request, res: Response) {
    const flightId = req.params["id"];
    const destId = req.params["destId"];

    const flight = await Flight.findById(flightId);
    if (flight) {
        flight.destinations.pull({_id: destId});
        res.redirect("/flights/" + flightId);
    } else {
        console.error("[controllers/destinations]: tried to find a flight with id: " + flightId +
            ", but it does not exist in db!");
        res.redirect("/flights");
    }
}

export default {
    create: _create,
    delete: _delete,
}

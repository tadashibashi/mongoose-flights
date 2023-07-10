import { Request, Response } from "express";
import Ticket from "../models/Ticket";
import {Flight} from "../models/Flight";

async function _create(req: Request, res: Response) {
    const flightId = req.params["id"];

    const seat = req.body["seat"] ? req.body["seat"].trim() : "";
    const price = req.body["price"];

    if (await Ticket.findOne({seat})) {
        console.error("A ticket with this seat already exists in flight: ", flightId);
        res.redirect("/flights/" + flightId);
        return;
    }

    try {
        await Ticket.create({
            seat,
            price,
            flight: flightId,
        });
    } catch(e) {
        if (e instanceof Error)
            console.error(e.message);
        else
            console.error(e);
    }

    res.redirect("/flights/" + flightId);
}

async function _delete(req: Request, res: Response) {
    const ticketId = req.params["ticketId"];
    const flightId = req.params["id"];

    const ticket = await Ticket.findById(ticketId);

    if (ticket) {
        try {
            await Ticket.deleteOne({_id: ticketId});
        } catch(e) {
            if (e instanceof Error)
                console.error(e.message);
            else
                console.error(e);
        }
    } else {
        console.error("[controller/tickets: _delete]: ticket id was invalid");
    }

    res.redirect("/flights/" + flightId);
}

/**
 * @route GET /flights/:id/tickets/new
 */
async function _new(req: Request, res: Response) {
    const flightId = req.params["id"];
    const flight = await Flight.findById(flightId);

    res.locals.vars = { flight };
    res.render("tickets/new");
}

export default {
    delete: _delete,
    create: _create,
    new: _new,
}

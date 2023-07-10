import {Request, Response, NextFunction} from "express";
import {Flight, airports, airlines} from "../models/Flight";
import {cleanseBody} from "./util";
import mongoose from "mongoose";
import Ticket from "../models/Ticket";

async function _index(req: Request, res: Response, next: NextFunction) {
    const flights = await Flight.find({}).sort({departs: "desc"});
    res.locals.vars = { flights };
    res.render("flights");
}

async function _show(req: Request, res: Response) {
    const id = req.params["id"];
    const flight = await Flight.findById(id);

    const tickets = await Ticket.find({flight: id}).sort({seat: "asc"});

    res.locals.vars = { flight, airports, airlines, tickets };
    res.render("flights/show");
}

function _new(req: Request, res: Response, next: NextFunction): void {
    res.locals.vars = {
        airports,
        airlines,
    };
    res.render("flights/new");
}

async function _create(req: Request, res: Response) {
    // set empty form inputs to undefined
    cleanseBody(req.body);

    const flight = new Flight(req.body);

    // convert destinations into array
    for (let i = 0; req.body["destination" + i]; ++i) {
        flight.destinations.push({airport: req.body["destination" + i]});
    }

    flight.save();
    res.redirect("/flights");
}

async function _edit(req: Request, res: Response) {
    const id = req.params["id"];
    const flight = await Flight.findOne({_id: id});
    const tickets = await Ticket.find({flight: id});

    if (flight) {
        res.locals.vars = { flight, airports, airlines, tickets };
        res.render("flights/edit");
    } else {
        // error, could not find flight with id
        console.warn("controllers/flights.edit: tried to show edit page for Flight with id: ",
            id, " but it was not found in database");
        res.redirect("/flights");
    }
}

async function _update(req: Request, res: Response, next: NextFunction) {
    const id = req.params["id"];

    if (id.length === 0) {
        next("controllers/flights.update: could not get id!");
        return;
    }

    const flight = await Flight.findById(id);
    if (flight) {
        cleanseBody(req.body);

        // convert destinations into array
        if (!flight.destinations)
            flight.destinations = new mongoose.Types.Array();

        let dests = flight.destinations;
        dests.length = 0;

        for (let i = 0; req.body["destination" + i]; ++i) {
            dests.push({airport: req.body["destination" + i]});
        }

        flight.airline = req.body["airline"] || flight.airline;
        flight.airport = req.body["airport"] || flight.airport;
        flight.flightNo = req.body["flightNo"] || flight.flightNo;
        flight.departs = req.body["departs"] ? new Date(req.body["departs"]) : flight.departs;

        await flight.updateOne(req.body);

        res.redirect("/flights");
    } else {
        // error, could not find flight with id
        console.warn("controllers/flights.edit: tried to show edit page for Flight with id: ",
            id, " but it was not found in database");
        res.redirect("/flights");
    }
}

async function _delete(req: Request, res: Response, next: NextFunction) {
    const id = req.params["id"];

    if (id.length > 0) {
        await Flight.deleteOne({_id: id});
    } else {
        console.warn("[controllers/flights.delete]: tried to delete a Flight, " +
            "but id doesn't exist in db: ", id);
    }

    res.redirect("/flights");
}

export default {
    index: _index,
    show: _show,
    new: _new,
    edit: _edit,
    update: _update,
    create: _create,
    delete: _delete,
};

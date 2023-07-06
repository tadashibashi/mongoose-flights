import {Request, Response, NextFunction} from "express";
import Flight from "../models/Flight";

async function _index(req: Request, res: Response, next: NextFunction) {
    const flights = await Flight.find({}).sort({departs: "desc"});
    res.locals.vars = { flights };
    console.log(flights);
    res.render("flights");
}

function _show(req: Request, res: Response): void {
    res.render("flights/show");
}

const airports = ["AUS", "DFW", "DEN", "LAX", "SAN"];
const airlines = ["American", "Southwest", "United"];

function _new(req: Request, res: Response, next: NextFunction): void {
    res.locals.vars = {
        airports,
        airlines,
    };
    res.render("flights/new");
}

async function _create(req: Request, res: Response, next: NextFunction) {
    // set empty form inputs to undefined
    for (let key in req.body)
        if (key === "")
            delete req.body[key];

    let airline = req.body["airline"];
    if (typeof airline === "string")
        airline = airline.trim();

    let airport = req.body["airport"];
    if (typeof airport === "string")
        airport = airport.trim();

    let flightNo = req.body["flightNo"];
    if (typeof flightNo === "string")
        flightNo = parseInt(flightNo);

    let departs = req.body["departs"];
    if (typeof departs === "string")
        departs = departs.trim();

    console.log(departs)

    await Flight.create({
        airline,
        airport,
        flightNo,
        departs,
    });

    res.redirect("/flights");
}

async function _edit(req: Request, res: Response, next: NextFunction) {
    const id = req.params["id"];
    const flight = await Flight.findOne({_id: id});

    if (flight) {
        res.locals.vars = { flight, airports, airlines };
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

    // set empty form inputs to undefined
    for (let key in req.body)
        if (key === "")
            delete req.body[key];

    let airline = req.body["airline"];
    if (typeof airline === "string")
        airline = airline.trim();

    let airport = req.body["airport"];
    if (typeof airport === "string")
        airport = airport.trim();

    let flightNo = req.body["flightNo"];
    if (typeof flightNo === "string")
        flightNo = parseInt(flightNo);

    let departs = req.body["departs"];
    if (typeof departs === "string")
        departs = departs.trim();

    await Flight.updateOne({_id: id},{
        airline,
        airport,
        flightNo,
        departs,
    });

    res.redirect("/flights");
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

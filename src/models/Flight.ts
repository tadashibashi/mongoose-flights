import mongoose from "mongoose";
const Schema = mongoose.Schema;

enum Airline {
    American = "American",
    Southwest = "Southwest",
    United = "United",
}

const airlines = Object.getOwnPropertyNames(Airline);

enum Airport {
    AUS = "AUS",
    DFW = "DFW",
    DEN = "DEN",
    LAX = "LAX",
    SAN = "SAN",
}

const airports = Object.getOwnPropertyNames(Airport);

// is there some way to turn an enum into an array?
// yes: https://timmousk.com/blog/typescript-enum-to-array/


interface IFlight {
    airline?: Airline;
    airport?: Airport; // default: "DEN"
    flightNo: number;
    departs?: Date;
    destinations: mongoose.Types.Array<IDestination>;
}

interface IDestination {
    airport: Airport,
    arrival: Date,
}

const destinationSchema = new Schema<IDestination>({
    airport: {
        type: String,
        enum: Object.getOwnPropertyNames(Airport),
    }
});

const flightSchema = new Schema<IFlight>({
    airline: {
        type: String,
        enum: Object.getOwnPropertyNames(Airline),
    },
    airport: {
        type: String,
        enum: Object.getOwnPropertyNames(Airport),
        default: "DEN",
    },
    flightNo: {
        type: Number,
        required: true,
        min: 10,
        max: 9999,
    },
    departs: {
        type: Date,
        default: function() {
            const date = new Date();
            date.setFullYear(date.getFullYear() + 1);
            return date;
        }
    },
    destinations: {
        type: [destinationSchema],
    },
});

const Flight = mongoose.model("Flight", flightSchema);
export {
    Flight as Flight,
    airports as airports,
    airlines as airlines,
};


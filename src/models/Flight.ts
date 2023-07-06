import mongoose from "mongoose";
const Schema = mongoose.Schema;

interface IFlight {
    airline?: "American" | "Southwest" | "United";
    airport?: "AUS"| "DFW" | "DEN" | "LAX" | "SAN"; // default: "DEN"
    flightNo: number,
    departs?: Date,
}

const flightSchema = new Schema<IFlight>({
    airline: {
        type: String,
        enum: ["American", "Southwest", "United"],
    },
    airport: {
        type: String,
        enum: ["AUS", "DFW", "DEN", "LAX", "SAN"],
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
    }
});

export default mongoose.model("Flight", flightSchema);

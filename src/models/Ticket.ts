import mongoose, {Schema} from "mongoose";

interface ITicket {
    seat: string,
    price: number,
    flight: mongoose.Types.ObjectId,
}

const ticketSchema = new Schema<ITicket>({
    seat: {
        type: String,
        matches: /^[A-Z][1-9]\d?/,
        required: true,
    },
    price: {
        type: Number,
        min: 0,
        required: true,
    },
    flight: {
        type: Schema.Types.ObjectId,
        ref: "Flight", // enables populate method
        required: true,
    },
});

const Ticket = mongoose.model("Ticket", ticketSchema);

export default Ticket;

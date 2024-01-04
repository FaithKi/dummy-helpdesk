import mongoose ,{ Schema } from "mongoose";

const ticketSchema = new Schema (
    {
        title: String,
        body: String,
        priority: String,
        user_email: String
    },
    {
        timestamps: true
    }
);

const Ticket = mongoose.models.Ticket || mongoose.model("Ticket", ticketSchema);

export default Ticket;
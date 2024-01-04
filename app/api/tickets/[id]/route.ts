import { ObjectId } from "mongoose";
import connectMongoDB from "../../../../libs/connect-db";
import Ticket from "../../../../models/ticket";
import { NextResponse } from "next/server";

export async function GET(request: Request, context : { params: {id : string} }) {
    await connectMongoDB();
    const ticket = await Ticket.findById(context.params.id);
    return NextResponse.json({ticket})
}

export async function DELETE(request: Request, context : { params: {id : string} }) {
    await connectMongoDB();
    await Ticket.deleteOne({_id: context.params.id});
    return NextResponse.json({message: "Ticket Deleted"}, {status: 200})
}

export async function PATCH(request: Request, context : { params: {id : string} }) {
    const newTicket = await request.json();
    await connectMongoDB();
    await Ticket.updateOne({_id: context.params.id}, newTicket);
    return NextResponse.json({message: "Ticket Updated"}, {status: 200})
}
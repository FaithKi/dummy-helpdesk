import connectMongoDB from "../../../libs/connect-db";
import Ticket from "../../../models/ticket";
import { NextResponse } from "next/server";

export async function POST(request:Request) {
    const { title, body, priority, user_email } = await request.json();
    await connectMongoDB();
    await Ticket.create({ title, body, priority, user_email });
    return NextResponse.json({message: "Ticket Created"}, { status: 201});
}

export async function GET() {
    await connectMongoDB();
    const tickets = await Ticket.find();
    return NextResponse.json({tickets});
}
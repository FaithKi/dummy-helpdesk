import { notFound } from "next/navigation";
import React from "react";
import TicketNav from "./TicketNav";

export const dynamicParams = true;
//if true, nextjs try to fetch the data that hasn't been rendered
//if false, nextjs return 404 page if the data hasn't beeen rendered
//true is default

//this function makes next able to pre-render all the /tickets/{id} pages (makes the performance better)
//shouldn't use this func when revalidation is set to 0
export async function generateStaticParams() {
  const res = await fetch("http://localhost:4000/tickets/");

  const tickets = await res.json();

  return tickets.map((ticket: any) => ({
    id: ticket.id,
  }));
}

async function getTicket(id: string) {
  const res = await fetch("http://localhost:4000/tickets/" + id, {
    next: {
      revalidate: 0,
      //this means that next will cache the res for xxx seconds
      //set revalidate to 0 to not cache res at all (will need to fetch everytime this function is called)(make things slower)
    },
  });
  if (!res.ok) {
    notFound();
  }

  return res.json();
}

export default async function TicketDetails({ params }: any) {
  const ticket = await getTicket(params.id);

  return (
    <main>
      <nav>
        <h2>Ticket Details</h2>
      </nav>
      <div className="card">
        <h3>{ticket.title}</h3>
        <small>{ticket.user_email}</small>
        <p>{ticket.body}</p>
        <div className={`pill ${ticket.priority}`}>
          {ticket.priority} priority
        </div>
      </div>
      <TicketNav id={ticket.id} />
    </main>
  );
}

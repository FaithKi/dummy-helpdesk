"use client";

import { notFound, useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

export default function EditForm({ ticket }: any) {
  const router = useRouter();

  const [newTitle, setNewTitle] = useState(ticket.title);
  const [newBody, setNewBody] = useState(ticket.body);
  const [newPriority, setNewPriority] = useState(ticket.priority);
  const id = ticket.id;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("save clicked");
    const newTicket = {
      title: newTitle,
      body: newBody,
      priority: newPriority,
    };

    const res = await fetch(`http://localhost:4000/tickets/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTicket),
    });

    if (res.status === 200) {
      router.refresh();
      router.push(`/tickets/${id}`);
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <label>
        <span>Title:</span>
        <input
          required
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
      </label>
      <label>
        <span>Body:</span>
        <textarea
          required
          value={newBody}
          onChange={(e) => setNewBody(e.target.value)}
        />
      </label>
      <select
        value={newPriority}
        onChange={(e) => setNewPriority(e.target.value)}
      >
        <option value="low">Low Priority</option>
        <option value="medium">Medium Priority</option>
        <option value="high">High Priority</option>
      </select>
      <button className="btn-primary">Save</button>
      <button className="btn-secondary">Cancel</button>
    </form>
  );
}

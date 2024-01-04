"use client";

import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  id: string;
}

export default function TicketNav({ id }: Props) {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    const res = await fetch(`http://localhost:3000/api/tickets/${id}`, {
      method: "DELETE",
      next: {
        revalidate: 0,
      },
    });
    if (res.status === 200) {
      console.log(res);
      router.push("/tickets");
      router.refresh();
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/tickets/${id}/edit`);
  };

  return (
    <nav>
      <button className="btn-primary" onClick={() => handleDelete(id)}>
        Delete
      </button>
      <button className="btn-secondary" onClick={() => handleEdit(id)}>
        Edit
      </button>
    </nav>
  );
}

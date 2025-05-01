"use client";
import { MoveUpRight, Pen, Trash } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import DeleteDialog from "./DeleteDialog";

export default function ShortcutSingleAirdrop({
  airdropLink,
  claimDate,
  _id,
  userId,
}: {
  airdropLink: string;
  claimDate: string;
  _id: string;
  userId: string;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      {/* Delete Dialog */}
      <DeleteDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        airdrop={{ userId, _id }}
      />

      <section className="my-10 grid grid-cols-1 md:grid-cols-3 gap-2">
        <Link
          href={airdropLink}
          className="flex space-x-2 items-center justify-center text-black bg-primary-1 dark:bg-primary-1 rounded-full p-4"
        >
          <MoveUpRight size={15} />
          <span className="font-bold text-sm">Open</span>
        </Link>

        <Link
          href={`${_id}/edit`}
          className="flex space-x-2 items-center justify-center bg-secondary-1 dark:bg-black rounded-full p-4"
        >
          <Pen size={15} />
          <span className="font-bold text-sm">Edit</span>
        </Link>

        <button
          onClick={() => {
            setIsOpen(true);
          }}
          className="flex space-x-2 items-center justify-center bg-red-500 text-red-900 rounded-full p-4 cursor-pointer"
        >
          <Trash size={15} />
          <span className="font-bold text-sm">Delete</span>
        </button>
      </section>
    </>
  );
}

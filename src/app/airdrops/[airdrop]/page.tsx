"use client";

import AirdropGroup from "@/components/AirdropGroup";
import AirdropTask from "@/components/AirdropTask";
import Heading1 from "@/components/Heading1";
import Paragraph from "@/components/Paragraph";
import Wrapper from "@/components/Wrapper";
import { ModalContext } from "@/contexts/modal-context";
import { CircleCheck, CircleX, MoveUpRight, Pen, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState } from "react";
import BackButton from "@/components/BackButton";

export default function SingleAirdrop() {
  const { isModalOpen, setIsModalOpen } = useContext(ModalContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Wrapper>
      <BackButton />
      <header className="flex flex-col justify-center items-center">
        {/* Profile Card */}
        <Link
          href="#"
          className="flex items-center my-6 space-x-4 p-4 w-[265px] bg-secondary-1 leading-4 rounded-lg dark:bg-black"
        >
          <div>
            <Image
              src="/profile.png"
              height="40"
              width="40"
              alt="Fab3 Logo"
              className="rounded-full"
            />
          </div>
          <div>
            <Heading1 className="text-md">Emmanuel Abel</Heading1>
            <Paragraph className="text-secondary-2 text-sm">
              @abellmanuell
            </Paragraph>
          </div>
        </Link>
      </header>
      {/* END Profile Card */}

      <div className="flex flex-col items-center ">
        <Image src="/taker.png" height="40" width="40" alt="Fab3 Logo" />
        <div className="text-center mt-2">
          <Heading1 className="font-black italic text-4xl text-center">
            earn.taker.xzy
          </Heading1>
          <Paragraph className="text-xs text-secondary-2">
            Apr 19, 2025
          </Paragraph>
        </div>
      </div>

      {/* Task status */}
      <div className="my-4 flex justify-center">
        {!false ? (
          <div className="flex text-center space-x-2 text-sm text-green-500">
            <CircleCheck size={20} />
            <span>Today task completed</span>
          </div>
        ) : (
          <div className="flex text-center space-x-2 text-sm text-pink-500">
            <CircleX size={20} />
            <span>Today task incomplete</span>
          </div>
        )}
      </div>

      {/* Shortcurt action button */}
      <Shortcut setIsModalOpen={setIsModalOpen} setIsOpen={setIsOpen} />

      <AirdropGroup>
        <AirdropTask
          title="earn.taker.xyx"
          href="#"
          img_src="/taker.png"
          date="Dec 31, 2025"
        />
      </AirdropGroup>

      <DeleteDialog isOpen={isOpen} setIsOpen={setIsOpen} />
    </Wrapper>
  );
}

function Shortcut({
  setIsModalOpen,
  setIsOpen,
}: {
  setIsModalOpen: any;
  setIsOpen: any;
}) {
  return (
    <section className="my-10 grid grid-cols-1 md:grid-cols-3 gap-2">
      <Link
        href="#"
        className="flex space-x-2 items-center justify-center text-black bg-primary-1 dark:bg-primary-1 rounded-full p-4"
      >
        <MoveUpRight size={15} />
        <span className="font-bold text-sm">Open</span>
      </Link>

      <Link
        href="a/edit"
        onClick={() => {
          setIsModalOpen(true);
        }}
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
  );
}

function DeleteDialog({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: any;
}) {
  return (
    <>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black/50">
          <DialogPanel className="max-w-lg space-y-4 border bg-white p-12 dark:bg-black rounded-lg border-none">
            <div className="flex justify-center">
              <div className="bg-primary-2 dark:bg-primary-2/20 rounded-full inline-block p-6 ">
                <Trash size={20} className="text-primary-1" />
              </div>
            </div>

            <Description>Are you sure you want to delete?</Description>

            <div className="grid grid-cols-2 gap-4">
              <button
                className="bg-primary-2 dark:bg-primary-2/20 p-2 dark:text-white text-black cursor-pointer rounded-full"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-primary-1 p-2 text-black font-bold cursor-pointer rounded-full"
                onClick={() => setIsOpen(false)}
              >
                Delete
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}

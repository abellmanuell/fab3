import AirdropGroup from "@/components/AirdropGroup";
import AirdropTask from "@/components/AirdropTask";
import Heading1 from "@/components/Heading1";
import Paragraph from "@/components/Paragraph";
import Wrapper from "@/components/Wrapper";
import { CircleCheck, CircleX, MoveUpRight, Pen, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function SingleAirdrop() {
  return (
    <Wrapper>
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
      <Shortcut />

      <AirdropGroup>
        <AirdropTask
          title="earn.taker.xyx"
          href="#"
          img_src="/taker.png"
          date="Dec 31, 2025"
        />
      </AirdropGroup>
    </Wrapper>
  );
}

function Shortcut() {
  return (
    <section className="my-10 grid grid-cols-1 md:grid-cols-3 gap-2">
      <Link
        href="#"
        className="flex space-x-2 items-center justify-center bg-secondary-1 dark:bg-black rounded-full p-4"
      >
        <MoveUpRight size={15} />
        <span className="font-medium text-sm">Open</span>
      </Link>

      <Link
        href="#"
        className="flex space-x-2 items-center justify-center bg-secondary-1 dark:bg-black rounded-full p-4"
      >
        <Pen size={15} />
        <span className="font-medium text-sm">Edit</span>
      </Link>

      <button className="flex space-x-2 items-center justify-center bg-red-500 text-red-900 rounded-full p-4">
        <Trash size={15} />
        <span className="font-medium text-sm">Delete</span>
      </button>
    </section>
  );
}

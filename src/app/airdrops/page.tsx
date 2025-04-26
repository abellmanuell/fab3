"use client";

import React, { useContext, useEffect, useState } from "react";
import { Plus, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Wrapper from "@/components/Wrapper";
import Heading1 from "@/components/Heading1";
import Paragraph from "@/components/Paragraph";
import AirdropCard from "@/components/AirdropCard";
import AirdropGroup from "@/components/AirdropGroup";
import { ModalContext } from "@/contexts/modal-context";
import { toast, ToastContainer } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import Cookie from "js-cookie";

export default function Page() {
  const { isModalOpen, setIsModalOpen } = useContext(ModalContext);
  const router = useRouter();

  const query = useSearchParams();
  const success = Boolean(query.get("success"));
  const message = query.get("message");

  const access_token = Cookie.get("access_token");

  useEffect(() => {
    if (!access_token) {
      router.replace("/login?success=false&message=You're logout");
    }

    if (success && message) {
      toast.success(message);
      router.push("/airdrops");
    }
  }, [success, message]);

  return (
    <Wrapper>
      <ToastContainer />

      <header className="flex flex-col justify-center items-center">
        <div>
          <Image src="/logo.svg" height="98" width="98" alt="Fab3 Logo" />
          <Heading1 className="font-black italic text-4xl text-center">
            Fab3
          </Heading1>
        </div>

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
            {/* <h1>Emmanuel Abel</h1> */}
            <Heading1 className="text-md">Emmanuel Abel</Heading1>
            <Paragraph className="text-secondary-2 text-sm">
              @abellmanuell
            </Paragraph>
          </div>
        </Link>
      </header>

      {/* Add Airdrop Button */}
      <div className="flex justify-center">
        <Link
          href="/airdrops/add"
          onClick={() => {
            setIsModalOpen(true);
          }}
          className="flex py-4 px-6 rounded-full space-x-2 bg-primary-2 text-primary-1 dark:bg-primary-1 dark:text-black cursor-pointer"
        >
          <Plus />
          <span className="font-bold">Add Airdrop</span>
        </Link>
      </div>

      <div className="px-4 mt-6 mb-4 flex justify-between">
        <p className="text-sm">All airdrops</p>
        <div>
          <Search size={20} />
        </div>
      </div>

      {/* Airdrops*/}
      <AirdropGroup>
        <AirdropCard
          title="earn.taker.xyx"
          href="#"
          img_src="/taker.png"
          date="Apr 19, 2025"
          status={true}
        />

        <AirdropCard
          title="soccersm.ai"
          href="#"
          img_src="/soccersm.ai.png"
          date="Dec 31, 2025"
        />

        <AirdropCard
          title="earn.guild.xzy"
          href="#"
          img_src="/earn.guild.xzy.png"
          date="Jul 31, 2025"
        />
      </AirdropGroup>
    </Wrapper>
  );
}

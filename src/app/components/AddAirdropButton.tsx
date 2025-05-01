"use client";
import { toast, ToastContainer } from "react-toastify";

import { Plus } from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AddAirdropButton() {
  const router = useRouter();

  const query = useSearchParams();
  const success = Boolean(query.get("success"));
  const message = query.get("message");

  useEffect(() => {
    if (success && message) {
      toast.success(message);
      router.replace("/airdrops");
    }
  }, [success, message]);

  return (
    <>
      <ToastContainer />

      <div className="flex justify-center">
        <Link
          href="/airdrops/add"
          className="flex py-4 px-6 rounded-full space-x-2 bg-primary-2 text-primary-1 dark:bg-primary-1 dark:text-black cursor-pointer"
        >
          <Plus />
          <span className="font-bold">Add Airdrop</span>
        </Link>
      </div>
    </>
  );
}

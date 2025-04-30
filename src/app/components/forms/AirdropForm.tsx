"use client";

import React, { useActionState, useEffect } from "react";
import Input from "../Input";
import { Calendar, Link } from "lucide-react";
import Button from "../Button";
import { toast, ToastContainer } from "react-toastify";
import { addAirdrop } from "actions/airdrops";

export default function AirdropForm({
  btnContent,
  userId,
}: {
  btnContent: string;
  userId?: any;
}) {
  const [state, action, pending] = useActionState(addAirdrop, undefined);

  useEffect(() => {
    if (state?.message) {
      toast.success(state.message);
    }
  }, [state?.message]);

  return (
    <>
      <ToastContainer />
      <form action={action} className="space-y-4">
        <Input
          type="text"
          name="airdrop_link"
          placeholder="Airdrop Link (e.g. https://...)"
          icon={Link}
        />

        {state?.errors?.airdropLink && (
          <p className="text-pink-500">{state.errors.airdropLink}</p>
        )}

        <Input
          name="claim_date"
          type="date"
          placeholder="Date"
          icon={Calendar}
        />
        {state?.errors?.claimDate && (
          <p className="text-pink-500">{state.errors.claimDate}</p>
        )}
        {userId && (
          <Input
            className="hidden"
            name="userId"
            type="hidden"
            value={userId}
          />
        )}
        <Button isSubmitting={pending}>{btnContent}</Button>
      </form>
    </>
  );
}

"use client";

import React, { useActionState, useEffect } from "react";
import { Calendar, Link } from "lucide-react";
import Button from "@/app/components/PrimaryButton";
import { toast, ToastContainer } from "react-toastify";
import Input from "@/components/Input";

export default function AirdropForm({
  addAirdropAction,
  userId,
}: {
  addAirdropAction: any;
  userId?: any;
}) {
  const [state, action, pending] = useActionState(addAirdropAction, {
    message: "",
    errors: { airdropLink: "", claimDate: "" },
  });

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
        <Button isSubmitting={pending}>Add</Button>
      </form>
    </>
  );
}

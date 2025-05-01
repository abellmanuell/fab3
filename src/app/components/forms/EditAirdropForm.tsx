"use client";

import React, { useActionState, useEffect, useState } from "react";
import { Calendar, Link } from "lucide-react";
import Button from "@/components/Button";
import { toast, ToastContainer } from "react-toastify";
import Input from "@/components/Input";
import { editAirdrop } from "actions/airdrops";
import { findAirdrop } from "@/lib/db/airdropDB";
import { useParams } from "next/navigation";

interface EditAirdropFormProps {
  btnContent: string;
  userId?: any;
}

export default function EditAirdropForm({
  btnContent,
  userId,
}: EditAirdropFormProps) {
  const [state, action, pending] = useActionState(editAirdrop, undefined);

  const { airdrop: airdropId } = useParams();
  const [airdrop, setAirdrop] = useState<{
    airdropLink: string;
    claimDate: string;
    userId: string;
    _id: string;
  }>();

  useEffect(() => {
    if (state?.message) {
      toast.success(state.message);
    }

    (async () => {
      const airdrop =
        typeof airdropId === "string" && (await findAirdrop(airdropId));
      if (airdrop && typeof airdrop === "object" && "airdropLink" in airdrop) {
        setAirdrop(
          airdrop as {
            airdropLink: string;
            claimDate: string;
            userId: string;
            _id: string;
          }
        );
      }
    })();
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
          value={airdrop?.airdropLink}
        />

        {state?.errors?.airdropLink && (
          <p className="text-pink-500">{state.errors.airdropLink}</p>
        )}

        <Input
          name="claim_date"
          type="date"
          placeholder="Date"
          icon={Calendar}
          value={airdrop?.claimDate}
        />
        {state?.errors?.claimDate && (
          <p className="text-pink-500">{state.errors.claimDate}</p>
        )}
        {airdrop?.userId && (
          <Input
            className="hidden"
            name="userId"
            type="hidden"
            value={airdrop.userId}
          />
        )}

        {airdrop?._id && (
          <Input
            className="hidden"
            name="_id"
            type="hidden"
            value={airdrop._id}
          />
        )}
        <Button isSubmitting={pending}>{btnContent}</Button>
      </form>
    </>
  );
}

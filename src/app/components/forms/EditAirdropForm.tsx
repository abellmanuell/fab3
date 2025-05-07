"use client";

import React, { useActionState, useEffect, useState } from "react";
import { Calendar, Link } from "lucide-react";
import Button from "@/app/components/PrimaryButton";
import { toast, ToastContainer } from "react-toastify";
import Input from "@/components/Input";
import { useParams } from "next/navigation";
import LoadingCard from "../LoadingCard";

interface EditAirdropFormProps {
  findAirdrop: any;
  updateAirdropAction: any;
}

export default function EditAirdropForm({
  findAirdrop,
  updateAirdropAction,
}: EditAirdropFormProps) {
  const [state, action, pending] = useActionState<{
    message: string;
    errors: {
      airdropLink?: string;
      claimDate?: string;
    };
  }>(updateAirdropAction, {
    message: "",
    errors: {},
  });

  const { airdropId } = useParams();
  const [airdrop, setAirdrop] = useState<{
    airdropLink: string;
    claimDate: string;
    userId: string;
    _id: string;
  }>();

  useEffect(() => {
    if (state?.message) {
      toast.success(state?.message);
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
        {!airdrop?.airdropLink ? (
          <LoadingCard height={50} />
        ) : (
          <Input
            type="text"
            name="airdrop_link"
            placeholder="Airdrop Link (e.g. https://...)"
            icon={Link}
            value={airdrop?.airdropLink}
          />
        )}

        {state?.errors?.airdropLink && (
          <p className="text-pink-500">{state.errors?.airdropLink}</p>
        )}

        {!airdrop?.airdropLink ? (
          <LoadingCard height={50} />
        ) : (
          <Input
            name="claim_date"
            type="date"
            placeholder="Date"
            icon={Calendar}
            value={airdrop?.claimDate}
          />
        )}

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
        <Button isSubmitting={pending}>Save</Button>
      </form>
    </>
  );
}

"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Heading1 from "@/components/Heading1";
import Paragraph from "@/components/Paragraph";
import { useParams } from "next/navigation";
import ShortcutSingleAirdrop from "./ShortcutSingleAirdrop";
import LoadingCard from "./LoadingCard";

export default function AirdropBoard({ airdropFn }: any) {
  const { airdrop: id } = useParams<{ airdrop: string }>();
  const [airdrop, setAirdrop] = useState<{
    airdropLink: string;
    claimDate: string;
    userId: string;
    _id: string;
  }>();

  useEffect(() => {
    airdropFn(id).then((resp: any) => setAirdrop(resp));
  }, []);

  const { hostname, host } = airdrop?.airdropLink
    ? new URL(airdrop.airdropLink)
    : { hostname: "" };

  return (
    <>
      {!airdrop?.claimDate && !airdrop?.airdropLink ? (
        <LoadingCard height={150} />
      ) : (
        <div className="flex flex-col items-center ">
          <Image
            src={`https://www.google.com/s2/favicons?domain=${host}&sz=128`}
            height="40"
            width="40"
            alt={hostname}
          />
          <div className="text-center mt-2 space-y-4">
            <Heading1 className="font-black italic text-4xl text-center">
              {hostname}
            </Heading1>
            <Paragraph className="text-xs text-secondary-2">
              {airdrop?.claimDate}
            </Paragraph>
          </div>
        </div>
      )}

      <ShortcutSingleAirdrop
        airdropLink={airdrop?.airdropLink || ""}
        claimDate={airdrop?.claimDate || ""}
        _id={airdrop?._id || ""}
        userId={airdrop?.userId || ""}
      />
    </>
  );
}

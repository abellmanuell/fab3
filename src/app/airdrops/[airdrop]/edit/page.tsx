import Heading1 from "@/components/Heading1";
import Paragraph from "@/components/Paragraph";
import Wrapper from "@/components/Wrapper";
import { Pencil } from "lucide-react";
import React from "react";
import { redirect } from "next/navigation";
import { verifySession } from "@/lib/verifySession";
import EditAirdropForm from "@/app/components/forms/EditAirdropForm";
import { findAirdrop } from "@/lib/db/airdropDB";
import BackButton from "@/app/components/BackButton";

export default async function EditAirdrop() {
  // Check verify a session
  const session = await verifySession();
  if (!session.isAuth) return redirect("/login");

  return (
    <Wrapper>
      <BackButton />
      <header className="mb-10">
        <div className="flex flex-col items-center ">
          <div className="bg-primary-2 text-primary-1 p-6 rounded-full dark:bg-primary-1/20">
            <Pencil size={30} />
          </div>

          <div className="mt-2">
            <Heading1 className="font-black italic text-4xl text-center">
              Modify Airdrop
            </Heading1>
            <Paragraph className="text-sm text-secondary-2 mt-2">
              Grind Smarter, Not Harder. Edit your airdrop.
            </Paragraph>
          </div>
        </div>
      </header>

      <EditAirdropForm btnContent="Save" />
    </Wrapper>
  );
}

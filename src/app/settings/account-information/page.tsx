import React from "react";
import BackButton from "@/app/components/BackButton";
import Heading1 from "@/app/components/Heading1";
import Wrapper from "@/app/components/Wrapper";
import { verifySession } from "@/lib/verifySession";
import { findUserById } from "@/lib/db/userDB";
import EditUserForm from "@/app/components/forms/EditUserForm";
import { updateUserDataAction } from "actions/userActions";

export default async function AccountInformation() {
  // Check verify a session
  const session = await verifySession();
  if (!session) return null;

  const getUserData = await findUserById(session.userId);

  return (
    <Wrapper>
      <header>
        <div className="flex space-x-4 mb-10">
          <BackButton />
          <Heading1 className="font-black italic text-4xl ">
            Account Information
          </Heading1>
        </div>
      </header>

      <EditUserForm
        userData={getUserData}
        updateUserDataAction={updateUserDataAction}
      />
    </Wrapper>
  );
}

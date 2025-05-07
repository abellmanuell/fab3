import Heading1 from "@/components/Heading1";
import Paragraph from "@/components/Paragraph";
import Wrapper from "@/components/Wrapper";
import AddAirdropForm from "@/components/forms/AirdropForm";
import { Crown } from "lucide-react";
import BackButton from "@/components/BackButton";
import { verifySession } from "@/lib/verifySession";
import { addAirdropAction } from "actions/airdropsActions";

export default async function AddAirdrop() {
  // Check verify a session
  const session = await verifySession();
  if (!session) return null;

  return (
    <Wrapper>
      <BackButton />
      <header className="mb-10">
        <div className="flex flex-col items-center ">
          <div className="bg-primary-2 text-primary-1 p-6 rounded-full dark:bg-primary-1/20">
            <Crown size={30} />
          </div>

          <div className="mt-2">
            <Heading1 className="font-black italic text-4xl text-center">
              Add Airdrop
            </Heading1>
            <Paragraph className="text-sm text-secondary-2 mt-2">
              Grind Smarter, Not Harder. Add your airdrop.
            </Paragraph>
          </div>
        </div>
      </header>

      {/* Add Airdrop Form */}
      <AddAirdropForm
        addAirdropAction={addAirdropAction}
        userId={session.userId}
      />
    </Wrapper>
  );
}

import { Search } from "lucide-react";
import Image from "next/image";
import Wrapper from "@/components/Wrapper";
import Heading1 from "@/components/Heading1";
import AirdropCard from "@/components/AirdropCard";
import AirdropGroup from "@/components/AirdropGroup";
import AddAirdropButton from "@/components/AddAirdropButton";
import { redirect } from "next/navigation";
import { verifySession } from "@/lib/verifySession";
import { findUserById } from "@/lib/db/userDB";
import { findAirdrops } from "@/lib/db/airdropDB";
import Profile from "@/components/Profile";
import LoadingCard from "../components/LoadingCard";

export default async function Page() {
  // Check verify a session
  const session = await verifySession();
  if (!session.isAuth) return redirect("/login");

  const userData = await findUserById(session.userId);
  const airdropList = await findAirdrops(session.userId);

  return (
    <Wrapper>
      <header className="flex flex-col justify-center items-center">
        <div>
          <Image src="/logo.svg" height="98" width="98" alt="Fab3 Logo" />
          <Heading1 className="font-black italic text-4xl text-center">
            Fab3
          </Heading1>
        </div>

        <Profile {...userData} />
      </header>

      {/* Add Airdrop Button */}
      <AddAirdropButton />

      <div className="px-4 mt-6 mb-4 flex justify-between">
        <p className="text-sm">All airdrops</p>
        <div>
          <Search size={20} />
        </div>
      </div>

      {/* Airdrops*/}
      <AirdropGroup>
        {!airdropList.length ? (
          <p className="text-center text-secondary-2 text-sm my-10">
            No airdrop
          </p>
        ) : (
          airdropList
            .map(async (airdrop) => {
              const { airdropLink, claimDate, _id } = airdrop;
              const { hostname, host } = new URL(airdropLink);

              return (
                <>
                  {!airdrop ? (
                    <LoadingCard height={60} />
                  ) : (
                    <AirdropCard
                      key={_id.toString()}
                      title={hostname ?? host}
                      href={airdropLink}
                      img_src={
                        airdropList &&
                        `https://www.google.com/s2/favicons?domain=${host}&sz=128`
                      }
                      date={claimDate}
                      view_href={`airdrops/${_id}`}
                    />
                  )}
                </>
              );
            })
            .reverse()
        )}
      </AirdropGroup>
    </Wrapper>
  );
}

import { Search, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Wrapper from "@/components/Wrapper";
import Heading1 from "@/components/Heading1";
import Paragraph from "@/components/Paragraph";
import AirdropCard from "@/components/AirdropCard";
import AirdropGroup from "@/components/AirdropGroup";
import { verifySession } from "../../lib/verifySession";
import AddAirdropButton from "@/components/AddAirdropButton";
import { redirect } from "next/navigation";
import { findUserById } from "../../lib/db/userDB";
import { findAirdrops } from "../../lib/db/airdropDB";
import axios from "axios";
import * as cheerio from "cheerio";

export default async function Page() {
  // Check verify a session
  const session = await verifySession();
  if (!session.isAuth) return redirect("/login");

  const user = await findUserById(session.userId);
  const airdrops = await findAirdrops();

  return (
    <Wrapper>
      <header className="flex flex-col justify-center items-center">
        <div>
          <Image src="/logo.svg" height="98" width="98" alt="Fab3 Logo" />
          <Heading1 className="font-black italic text-4xl text-center">
            Fab3
          </Heading1>
        </div>

        <Link
          href="/settings"
          className="flex items-center my-6 space-x-4 p-2 w-[265px] bg-secondary-1 leading-4 rounded-lg dark:bg-black"
        >
          <div>
            {user && !user.imgSrc ? (
              <div className="max-w-[40px] max-h-[40px] p-6 font-bold flex justify-center items-center rounded-full bg-gray-500">
                D
              </div>
            ) : (
              user && (
                <Image
                  src={user?.imgSrc}
                  height="40"
                  width="40"
                  alt="Fab3 Logo"
                  className="rounded-full"
                />
              )
            )}
          </div>

          <div>
            <Heading1 className="text-md capitalize">
              {user && user.nickname}
            </Heading1>
            <Paragraph className="text-secondary-2 text-sm">
              {(user && user.username) ?? user?.email}
            </Paragraph>
          </div>
        </Link>
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
        {!airdrops.length ? (
          <p className="text-center text-secondary-2 text-sm my-10">
            No airdrop
          </p>
        ) : (
          airdrops.map(async (airdrop) => {
            const { airdropLink, claimDate, _id } = airdrop;
            const { hostname, host } = new URL(airdropLink);

            return (
              <AirdropCard
                key={_id}
                title={hostname ?? host}
                href={airdropLink}
                img_src={
                  airdrops &&
                  `https://www.google.com/s2/favicons?domain=${host}&sz=128`
                }
                date={claimDate}
                view_href={`airdrops/${_id}`}
              />
            );
          })
        )}
      </AirdropGroup>
    </Wrapper>
  );
}

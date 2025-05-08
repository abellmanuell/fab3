"use client";
import React, { useState } from "react";
import SearchBar from "./SearchBar";
import { Search } from "lucide-react";
import AirdropGroup from "./AirdropGroup";
import AirdropCard from "./AirdropCard";

interface Airdrop {
  airdropLink: string;
  claimDate: string;
  _id: string;
}

export default function AirdropsContainer({
  airdropList,
}: {
  airdropList: any;
}) {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const normalizedSearch = searchTerm.trim().toLowerCase();

  const airdropListFilter = airdropList.filter(
    (airdrop: Airdrop) =>
      airdrop.airdropLink.toLowerCase().includes(normalizedSearch) ||
      airdrop.claimDate.toLowerCase().includes(normalizedSearch)
  );

  return (
    <>
      <div className="px-4 my-6 flex justify-between relative">
        <p className="text-sm z-10">All airdrops</p>

        <SearchBar setSearchTerm={setSearchTerm} searchTerm={searchTerm}>
          <Search size={20} />
        </SearchBar>
      </div>

      {/* Airdrops*/}
      <AirdropGroup>
        {!airdropListFilter.length ? (
          <p className="text-center text-secondary-2 text-sm my-10">
            No airdrop
          </p>
        ) : (
          airdropListFilter.reverse().map((airdrop: Airdrop) => {
            const { airdropLink, claimDate, _id } = airdrop;
            let hostname = "";
            let host = "";

            try {
              const url = new URL(airdropLink);
              hostname = url.hostname;
              host = url.host;
            } catch (e) {
              // fallback values or log error
              console.error(e);
            }

            return (
              <AirdropCard
                key={_id.toString()}
                title={hostname ?? host}
                href={airdropLink}
                img_src={
                  airdropListFilter &&
                  `https://www.google.com/s2/favicons?domain=${host}&sz=128`
                }
                date={claimDate}
                view_href={`airdrops/${_id}`}
              />
            );
          })
        )}
      </AirdropGroup>
    </>
  );
}

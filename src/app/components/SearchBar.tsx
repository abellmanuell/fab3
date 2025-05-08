"use client";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/app/utils/cn";

export default function SearchBar({
  searchTerm,
  setSearchTerm,
  children,
}: any) {
  const [canSearch, setCanSearch] = useState<boolean>(false);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleSearch = () => {
    setCanSearch(true);
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setCanSearch(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex justify-center items-center" ref={containerRef}>
      <input
        ref={searchInputRef}
        className={cn(
          "absolute right-0 transition-all duration-300 ease-in-out origin-right text-secondary-2 ring-0 outline-none placeholder:text-sm border py-2 pl-2 pr-10 text-sm border-secondary-2 z-20 bg-white dark:bg-black/20 rounded-lg",
          canSearch ? "w-full opacity-100" : "w-0 opacity-0 pointer-events-none"
        )}
        value={searchTerm}
        placeholder="What airdrop?"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        className="cursor-pointer z-30 inline-flex justify-center items-center text-secondary-2"
        onClick={handleSearch}
      >
        {children}
      </button>
    </div>
  );
}

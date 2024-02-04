"use client";

import React from "react";
import SearchIcon from "../../public/SearchIcon.svg";
import SorterCurrency from "../SortCurrency";
// import ThemeToggle from "../ThemeToggle";
import PortfolioSwitch from "../PortfolioSwitch";
import LogoIcon from "@/public/Logo.svg";
import SearchBar from "@/components/SearchBar";

const NavBar = () => {
  return (
    <div>
      <div className="w-full bg-zinc-950 flex items-centre justify-left gap-6 p-3 mt-2">
        <div className="flex gap-2 items-center">
          <LogoIcon />
          <h1 className="text-white">CoinWave</h1>
        </div>
        <PortfolioSwitch />
        <div className="relative flex w-[400px] items-center justify-right">
          <SearchIcon className="absolute left-2" />
          <SearchBar />
        </div>
        <SorterCurrency />
      </div>
    </div>
  );
};

export default NavBar;

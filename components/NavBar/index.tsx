"use client";

import React from "react";
import SearchIcon from "../../public/SearchIcon.svg";
import SorterCurrency from "../SortCurrency";
import ThemeToggle from "../ThemeToggle";
import PortfolioSwitch from "../PortfolioSwitch";
import LogoIcon from "@/public/Logo.svg";
import SearchBar from "@/components/SearchBar";
import UserProfile from "../UserProfile";
import CoinConverter from "../CoinConverter";

const NavBar = () => {
  return (
    <div>
      <div className="w-full dark:bg-gray-950 bg-light-theme flex items-center justify-between p-3 mt-2">
        <div className="flex gap-6 items-center dark:text-white text-black mr-8">
          <div className="flex items-center justify-end relative w-[105px]">
            <div className="absolute -left-4">
              <LogoIcon />
            </div>
            <h1>CoinWave</h1>
          </div>
          <div>
            <PortfolioSwitch />
          </div>
        </div>

        <div className="flex gap-3 items-center">
          <div className="relative flex w-[400px] items-center justify-end">
            <SearchIcon className="absolute left-2 z-10" />
            <SearchBar />
          </div>
          <UserProfile />
          <SorterCurrency />
          <CoinConverter />
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default NavBar;

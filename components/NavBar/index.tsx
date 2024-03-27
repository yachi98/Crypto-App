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
      <div className="w-full dark:bg-gray-950 bg-light-theme flex items-center justify-between gap-6 p-3 mt-2">
        <div className="flex gap-3 items-center">
          <LogoIcon />
          <h1 className="dark:text-white text-black">CoinWave</h1>
          <PortfolioSwitch />
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

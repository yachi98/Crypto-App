"use client";

import SearchBar from "@/components/SearchBar";
import LogoIcon from "@/public/Logo.svg";
import Link from "next/link";
import SearchIcon from "../../public/SearchIcon.svg";
import PortfolioSwitch from "../PortfolioSwitch";
import SorterCurrency from "../SortCurrency";
import ThemeToggle from "../ThemeToggle";
import UserProfile from "../UserProfile";

const NavBar = () => {
  return (
    <div>
      <div className="w-full flex items-center justify-between p-3 mt-2">
        <div className="flex gap-6 items-center dark:text-white text-black mr-8">
          <div className="flex items-center justify-end relative w-[95px]">
            <Link href="/" className="absolute -left-2">
              <LogoIcon />
            </Link>
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
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default NavBar;

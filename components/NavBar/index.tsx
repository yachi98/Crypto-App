"use client";

import SearchBar from "@/components/SearchBar";
import LogoIcon from "@/public/Logo.svg";
import Link from "next/link";
import PortfolioSwitch from "../PortfolioSwitch";
import SorterCurrency from "../SortCurrency";
import ThemeToggle from "../ThemeToggle";
import UserProfile from "../UserProfile";
import LanguageButton from "../LanguageButton/LanguageButton";

const NavBar = () => {
  return (
    <div className="w-full flex items-center justify-between py-1">
      <div className="flex gap-2 items-center dark:text-white text-black">
        <div className="flex items-center p-2 gap-2">
          <Link href="/">
            <LogoIcon />
          </Link>
          <h1 className="hidden sm:block">CoinWave</h1>
        </div>
        <div>
          <PortfolioSwitch />
        </div>
      </div>

      <div className="flex gap-3 items-center flex-shrink">
        <SearchBar />
        <UserProfile />
        {/* <LanguageButton /> */}
        <SorterCurrency />
        <ThemeToggle />
      </div>
    </div>
  );
};

export default NavBar;

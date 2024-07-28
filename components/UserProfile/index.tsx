import { useState, useEffect, useRef } from "react";
import UserProfileIcon from "@/public/UserProfileIcon.svg";
import ProfileIcon from "@/public/ProfileIcon.svg";
import SettingsIcon from "@/public/SettingsIcon.svg";
import HelpIcon from "@/public/HelpIcon.svg";
import LogOutIcon from "@/public/LogOutIcon.svg";
import ArrowIcon from "@/public/ArrowIcon.svg";
import { motion } from "framer-motion";
import Link from "next/link";

const UserProfile = () => {
  const [showDropDown, setShowDropDown] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setShowDropDown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setShowDropDown(!showDropDown)}
        className={`dark:bg-black bg-white rounded-xl p-2 text-xs dark:text-white text-black font-light flex items-center gap-2 justify-left ${
          showDropDown ? "rounded-bl-none rounded-br-none" : ""
        }`}
      >
        <UserProfileIcon />
        <span className="hidden sm:block">Daniel Yachnikov Hughes</span>
        <ArrowIcon
          className={`w-4 h-4 transition-transform duration-150 ${
            showDropDown ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>
      {showDropDown && (
        <motion.div
          initial={{ y: 10 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.2 }}
          style={{ zIndex: 51 }}
          className="absolute right-0 dark:bg-black bg-white overflow-hidden z-50 gap-2 sm:w-full rounded-tl-xl sm:rounded-tl-none flex flex-col rounded-b-xl px-2 pb-2 pt-1 text-xs font-light"
        >
          <button className="flex items-center gap-2 dark:text-[#a7a7a7] text-black dark:hover:text-white">
            <ProfileIcon className="w-4 h-4" />
            <span>Account</span>
          </button>
          <button className="flex items-center gap-2 dark:text-[#a7a7a7] text-black dark:hover:text-white">
            <SettingsIcon className="w-4 h-4" />
            <span>Settings</span>
          </button>
          <button className="flex items-center gap-2 dark:text-[#a7a7a7] text-black dark:hover:text-white">
            <HelpIcon className="w-4 h-4" />
            <span>Help</span>
          </button>
          <Link href="/logout">
            <button
              onClick={() => setShowDropDown(false)}
              className="flex items-center gap-2 dark:text-[#a7a7a7] text-black dark:hover:text-white"
            >
              <LogOutIcon className="w-4 h-4" />
              <span>Log out</span>
            </button>
          </Link>
        </motion.div>
      )}
    </div>
  );
};

export default UserProfile;

import { useState, useEffect, useRef } from "react";
import UserProfileIcon from "@/public/UserProfileIcon.svg";
import ProfileIcon from "@/public/ProfileIcon.svg";
import SettingsIcon from "@/public/SettingsIcon.svg";
import HelpIcon from "@/public/HelpIcon.svg";
import LogOutIcon from "@/public/LogOutIcon.svg";
import { motion } from "framer-motion";

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
        className={`w-[120px] z-50 dark:bg-black bg-white p-2 rounded-xl text-xs dark:text-white text-black font-light flex items-center gap-2 justify-left ${
          showDropDown ? "rounded-bl-none rounded-br-none" : ""
        }`}
      >
        <UserProfileIcon />
        Daniel
      </button>
      {showDropDown && (
        <motion.div
          initial={{ y: 10 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.2 }}
          style={{ zIndex: 51 }}
          className="absolute left-0 dark:bg-[#0f0f15] bg-white overflow-hidden z-50 gap-3 w-full flex flex-col justify-left rounded-b-xl p-3 text-xs font-light"
        >
          <button className="flex items-center gap-2 dark:text-[#a7a7a7] text-black dark:hover:text-white">
            <ProfileIcon />
            <span>Account</span>
          </button>
          <button className="flex items-center gap-2 dark:text-[#a7a7a7] text-black dark:hover:text-white">
            <SettingsIcon />
            <span>Settings</span>
          </button>
          <button className="flex items-center gap-2 dark:text-[#a7a7a7] text-black dark:hover:text-white">
            <HelpIcon />
            <span>Help</span>
          </button>
          <button className="flex items-center gap-2 dark:text-[#a7a7a7] text-black dark:hover:text-white">
            <LogOutIcon />
            <span>Log out</span>
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default UserProfile;

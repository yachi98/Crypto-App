import { useState } from "react";
import UserProfileIcon from "@/public/UserProfileIcon.svg";
import ProfileIcon from "@/public/ProfileIcon.svg";
import SettingsIcon from "@/public/SettingsIcon.svg";
import HelpIcon from "@/public/HelpIcon.svg";
import LogOutIcon from "@/public/LogOutIcon.svg";
import { motion } from "framer-motion";

const UserProfile = () => {
  const [showDropDown, setShowDropdown] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropDown)}
        className={`w-[120px] bg-gradient-to-r from-black to-gray-900 p-2 rounded-xl text-xs text-white font-light flex gap-2 justify-left ${
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
          className="absolute left-0 backdrop-filter bg-gradient-to-r from-black to-gray-900 backdrop-blur overflow-hidden z-30 gap-3 w-full flex flex-col justify-left rounded-b-xl p-3 text-[#c7c7c7] text-xs font-light"
        >
          <button className="flex items-center gap-2 hover:text-white">
            <ProfileIcon />
            <span>Account</span>
          </button>
          <button className="flex items-center gap-2 hover:text-white">
            <SettingsIcon />
            <span>Settings</span>
          </button>
          <button className="flex items-center gap-2 hover:text-white">
            <HelpIcon />
            <span>Help</span>
          </button>
          <button className="flex items-center gap-2 hover:text-white">
            <LogOutIcon />
            <span>Log out</span>
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default UserProfile;

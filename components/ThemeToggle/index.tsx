import SunIcon from "@/public/SunIcon.svg";
import MoonIcon from "@/public/MoonIcon.svg";

const ThemeToggle = () => {
  return (
    <button className="w-[45px] bg-black rounded-xl text-white text-xs flex items-center justify-center cursor-pointer">
      <SunIcon />
    </button>
  );
};

export default ThemeToggle;

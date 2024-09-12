import ArrowIcon from "@/public/ArrowIcon.svg";
import World from "@/public/World.svg";
import { useRouter } from "next/router";
import { useState } from "react";

const LanguageButton = () => {
  const [showDropdown, setShowDropDown] = useState(false);
  const router = useRouter();
  const { locale } = router;

  const switchTo = locale === "en" ? "fr" : "en";

  const changeLanguage = () => {
    router.push(router.pathname, router.asPath, { locale: switchTo });
  };

  return (
    <div>
      <button
        onClick={() => setShowDropDown(!showDropdown)}
        className="dark:bg-black bg-white p-2 rounded-xl text-xs dark:text-white text-black font-light flex gap-2 items-center justify-center"
      >
        <World className="w-5 h-5" />
        {locale === "en" ? "ENG" : "FRA"}
        <ArrowIcon
          className={`w-6 h-6 transition-transform duration-150 ${
            showDropdown ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>
      {showDropdown && (
        <div className="absolute bg-white border rounded-xl shadow-lg mt-2">
          <button onClick={changeLanguage} className="p-2">
            Switch to {switchTo === "en" ? "English" : "French"}
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageButton;

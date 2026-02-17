import { useGlobalLanguage } from "@/stores/globalLanguageStore";
import { useNewsLanguage } from "@/stores/newsLanguageStore";
import { useNavigate, useParams, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";

export default function LanguageSwitch() {
  const { lang } = useParams({ strict: false });
  const navigate = useNavigate();

  //Set the updated language on Zustand store
  const { currentLang, setLanguage } = useGlobalLanguage();

  //Fetch the whole location
  const { location } = useRouterState();

  const toggleLanguage = () => {
    const currentPath = location.pathname;

    // detect current lang from URL
    const currentLang = currentPath.split("/")[1];

    // console.log(currentLang);

    const updatedLang = currentLang === "en" ? "hi" : "en";

    // replace only first segment
    const newPath = currentPath.replace(`/${currentLang}`, `/${updatedLang}`);

    navigate({
      to: newPath,
      search: location.search,
      hash: location.hash,
    });

    setLanguage(updatedLang);
  };

  const { setNewsLanguage } = useNewsLanguage();

  //update News language when ever Global language is changed
  useEffect(() => {
    setNewsLanguage(currentLang);
  }, [currentLang]);

  return (
    <button
      onClick={() => toggleLanguage()}
      className={`
            relative flex items-center cursor-pointer
            w-16 h-8
            rounded-full
            transition-colors duration-300
            ${lang === "en" ? "bg-sky-600" : "bg-gray-400"}
          `}
    >
      {/* Knob */}
      <span
        className={`
              absolute left-1 top-1
              h-6 w-6
              rounded-full bg-white
              transition-transform duration-300
              ${lang === "en" ? "translate-x-8" : "translate-x-0"}
            `}
      />

      {/* Label */}
      <span
        className={`${lang === "en" ? "text-left pl-2" : "text-right pr-2 "} w-full text-xs font-semibold text-white z-10`}
      >
        {lang === "en" ? "ENG" : "हिंदी"}
      </span>
    </button>
  );
  // <button
  //   onClick={toggleLanguage}
  //   className="px-4 py-2 rounded-full bg-teal-600 text-white"
  // >
  //   {lang === "en" ? "ENG" : "हिंदी"}
  // </button>
}

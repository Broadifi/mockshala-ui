import { useNavigate, useParams } from "@tanstack/react-router"

export default function LanguageSwitch() {
  const { lang } = useParams({ strict: false })
  const navigate = useNavigate()

  const toggleLanguage = () => {
    navigate({
      to: "/$lang",
      params: {
        lang: lang === "en" ? "hi" : "en",
      },
    })
  }

  return (
        <button
          onClick={() => toggleLanguage()}
          className={`
            relative flex items-center
            w-16 h-8
            rounded-full
            transition-colors duration-300
            ${lang === "en"  ? "bg-sky-600" : "bg-gray-400"}
          `}
        >
          {/* Knob */}
          <span
            className={`
              absolute left-1 top-1
              h-6 w-6
              rounded-full bg-white
              transition-transform duration-300
              ${lang === "en"  ? "translate-x-8" : "translate-x-0"}
            `}
          />

          {/* Label */}
          <span className={`${lang === "en"  ? 'text-left pl-2': 'text-right pr-2 '} w-full text-xs font-semibold text-white z-10`}>
            {lang === "en" ? "ENG" : "हिंदी"}
          </span>
      </button>
  )
    // <button
    //   onClick={toggleLanguage}
    //   className="px-4 py-2 rounded-full bg-teal-600 text-white"
    // >
    //   {lang === "en" ? "ENG" : "हिंदी"}
    // </button>
  
}

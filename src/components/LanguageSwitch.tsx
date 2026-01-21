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
      onClick={toggleLanguage}
      className="px-4 py-2 rounded-full bg-teal-600 text-white"
    >
      {lang === "en" ? "ENG" : "हिंदी"}
    </button>
  )
}

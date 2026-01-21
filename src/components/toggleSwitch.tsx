import { useState } from "react"

export default function LanguageToggle() {
  const [isEnglish, setIsEnglish] = useState(true)

  return (
    <button
      onClick={() => setIsEnglish(!isEnglish)}
      className={`
        relative flex items-center
        w-16 h-8
        rounded-full
        transition-colors duration-300
        ${isEnglish ? "bg-sky-600" : "bg-gray-400"}
      `}
    >
      {/* Knob */}
      <span
        className={`
          absolute left-1 top-1
          h-6 w-6
          rounded-full bg-white
          transition-transform duration-300
          ${isEnglish ? "translate-x-8" : "translate-x-0"}
        `}
      />

      {/* Label */}
      <span className={`${isEnglish ? 'text-left pl-2': 'text-right pr-2 '} w-full text-xs font-semibold text-white z-10`}>
        {isEnglish ? "ENG" : "HIN"}
      </span>
    </button>
  )
}

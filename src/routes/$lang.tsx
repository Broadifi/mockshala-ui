import { Outlet, createFileRoute, redirect } from "@tanstack/react-router"
import i18n from "@/i18n"

const supportedLanguages = ["en", "hi"] as const

type SupportedLanguage = (typeof supportedLanguages)[number]

function isSupportedLanguage(lang: string): lang is SupportedLanguage {
  return supportedLanguages.includes(lang as SupportedLanguage)
}

export const Route = createFileRoute("/$lang")({
  beforeLoad: ({ params }) => {
    if (!isSupportedLanguage(params.lang)) {
      throw redirect({
        to: "/$lang",
        params: { lang: "en" },
      })
    }

    // ✅ Fully type-safe here this will change the language from fetching the params and reflect to the t = useTranslation
    
    i18n.changeLanguage(params.lang)
  },
  component: () => <Outlet />,
})

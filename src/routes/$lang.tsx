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

    // ✅ Fully type-safe here
    i18n.changeLanguage(params.lang)
  },
  component: () => <Outlet />,
})

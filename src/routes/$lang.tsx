import { Outlet, createFileRoute, redirect } from "@tanstack/react-router"
import i18n from "@/i18n"

const supportedLanguages = ["en", "hi"] as const

export const Route = createFileRoute("/$lang")({
  beforeLoad: ({ params }) => {
    if (!supportedLanguages.includes(params.lang as any)) {
      throw redirect({
        to: "/$lang",
        params: { lang: "en" },
      })
    }

    i18n.changeLanguage(params.lang)
  },
  component: () => <Outlet />,
})

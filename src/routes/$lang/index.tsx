import LanguageSwitch from "@/components/LanguageSwitch";
import HomeModule from "@/modules/home";
import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/$lang/")({
  component: RouteComponent,
});

function RouteComponent() {
   const { t } = useTranslation()
   
  return (
    <main>
      <HomeModule />
      <div className="w-full py-20 flex flex-col items-center bg-amber-400">
        <LanguageSwitch />
        <h1 className="text-3xl font-bold">{t("welcome")}</h1>
        <p className="text-gray-600">{t("description")}</p>
      </div>
      
    </main>
  );
}

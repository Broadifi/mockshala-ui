import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Check, Languages } from "lucide-react";
import { Button } from "./ui/button";

import { useNavigate, useRouterState } from "@tanstack/react-router";
import { useGlobalLanguage } from "@/stores/globalLanguageStore";

function LangSwitch() {
  const navigate = useNavigate();

  //Set the updated language on Zustand store
  const { currentLang, setLanguage } = useGlobalLanguage();

  const { location } = useRouterState();

  const handleLangChange = (value: string) => {
    // console.log(value);
    const currentPath = location.pathname;

    // detect current lang from URL
    const currentLang = currentPath.split("/")[1];

    // replace only first segment
    const newPath = currentPath.replace(`/${currentLang}`, `/${value}`);

    navigate({
      to: newPath,
      search: location.search,
      hash: location.hash,
    });

    setLanguage(value);
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="rounded-full p-0">
            <Languages className="h-6 w-6" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-48 p-2" align="end">
          <DropdownMenuGroup>
            {/* English */}
            <DropdownMenuItem
              onClick={() => handleLangChange("en")}
              className={`flex justify-between ${
                currentLang === "en" ? "bg-accent" : ""
              }`}
            >
              English
              {currentLang === "en" && <Check className="h-4 w-4" />}
            </DropdownMenuItem>

            {/* Hindi */}
            <DropdownMenuItem
              onClick={() => handleLangChange("hi")}
              className={`flex justify-between ${
                currentLang === "hi" ? "bg-accent" : ""
              }`}
            >
              Hindi
              {currentLang === "hi" && <Check className="h-4 w-4" />}
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default LangSwitch;

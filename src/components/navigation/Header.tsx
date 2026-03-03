import { Link, useLocation, useParams } from "@tanstack/react-router";
import { Bell, ChevronDown, ChevronRight, Menu, Search, X } from "lucide-react";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Badge } from "../ui/badge";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { mockShalaLogo } from "@/assets";
import ProfileIcon from "../ProfileIcon";
import { createHeaderData } from "../data/headerData";
import LangSwitch from "../langSwitch";
import LanguageSwitch from "../LanguageSwitch";
import { useTranslation } from "react-i18next";
import { ExamNavigation } from "@/modules/examNavigationMobile";
import { ExamModule } from "@/modules/exams";


// import LangSwitch from "../langSwitch";
// import LanguageToggle from "../toggleSwitch";

function Header() {
  //for translation
  const { t } = useTranslation();

  //Fetch the language params
  const { lang } = useParams({ strict: false });

  const homepageLink = lang ?? "en";

  const isLoggedIn = false;
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const { headerData, moreOptionData, headerDataTablet, moreOptionDataTablet } =
    createHeaderData(lang || "en");

  // Nested Sheet Navigation open
  const [menuView, setMenuView] = useState<"main" | "exam">("main");

  return (
    <header className="fixed w-full left-0 top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-md  flex justify-center ">
      <div className="w-full container px-4 py-3 md:py-2">
        <div className="flex gap-4 justify-between w-full  ">
          {/* Title for all view */}
          <Link
            to="/$lang"
            params={{ lang: homepageLink }}
            className="flex justify-center items-center"
          >
            <img
              src={mockShalaLogo}
              alt="mockShalaLogo"
              className="h-7 xl:h-8 w-auto"
            />
          </Link>

          {/* Quick Access  for Tablet View*/}
          <div className="hidden  lg:flex xl:hidden justify-center items-center text-muted-foreground">
            {headerDataTablet.map((item, index) =>
              item.isChild ? (
                <ExamModule key={index} />
              ) : (
                <Link
                  key={lang === "hi" ? item.titleHin : item.titleEn}
                  to={item.url}
                  className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors ${isActive(item.url) ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"}`}
                >
                  {lang === "hi" ? item.titleHin : item.titleEn}
                </Link>
              ),
            )}

            {/* more Option */}
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="font-medium">
                    <span className="text-xs">{t("nav.more")}</span>
                    <ChevronDown />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 p-2 z-50" align="end">
                  <DropdownMenuGroup>
                    {moreOptionDataTablet.map((item) => (
                      <DropdownMenuItem key={item.url} asChild>
                        <Link
                          key={lang === "hi" ? item.titleHin : item.titleEn}
                          to={item.url}
                          className={`w-full cursor-pointer p-2 rounded-md text-xs
                          ${isActive(item.url) ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"}`}
                        >
                          {lang === "hi" ? item.titleHin : item.titleEn}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Notification, bell and login/profile for tablet view */}
          <div className="hidden lg:flex xl:hidden gap-2  justify-center items-center text-muted-foreground">
            <button>
              <Search className="h-5 w-5" />
            </button>

            <div className="flex items-center">
              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell />
                <Badge className="absolute top-1 right-1 h-2 w-2 p-0 bg-red-500" />
              </Button>
            </div>

            {/* Language switch for tablet screen */}
            <div className="flex xl:hidden">
              <LangSwitch />
            </div>

            {isLoggedIn ? (
              <Link
                key="Profile"
                to="/$lang/profile"
                params={{ lang: `${lang}` }}
                onClick={() => setMobileOpen(false)}
                className={`flex gap-2 px-2 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive("/profile")
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                <ProfileIcon />
              </Link>
            ) : (
              <div>
                <Link
                  key={"Login"}
                  to="/$lang/login"
                  params={{ lang: `${lang}` }}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-3 "
                >
                  <Button
                    variant={"default"}
                    size={"sm"}
                    className="p-4 shadow-lg  bg-linear-to-r from-blue-600  to-sky-500 hover:from-sky-600 hover:to-blue-600
                   hover:scale-[1.03] hover:shadow-xl"
                  >
                    Login/Signup
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Quick Access  for Large View*/}
          <div className="hidden xl:flex lg:gap-1 xl:gap-2  justify-center items-center text-muted-foreground">
            {headerData.map((item, index) =>
              item.isChild ? (
                <ExamModule key={index} />
              ) : (
                <Link
                  key={lang === "hi" ? item.titleHin : item.titleEn}
                  to={item.url}
                  className={`lg:px-1 lg:py-1 xl:px-2 xl:py-2 text-sm font-medium rounded-md transition-colors 
                  ${isActive(item.url) ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"}`}
                >
                  {lang === "hi" ? item.titleHin : item.titleEn}
                </Link>
              ),
            )}

            {/* more Option */}
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="font-medium cursor-pointer"
                  >
                    {t("nav.more")}
                    <ChevronDown />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 p-2 z-50" align="end">
                  <DropdownMenuGroup>
                    {moreOptionData.map((item) => (
                      <DropdownMenuItem key={item.url} asChild>
                        <Link
                          key={lang === "hi" ? item.titleHin : item.titleEn}
                          to={item.url}
                          className={`w-full cursor-pointer p-2 my-2 rounded-md
                          ${isActive(item.url) ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"}`}
                        >
                          {lang === "hi" ? item.titleHin : item.titleEn}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/*Notification, Search and Login/Profile For Large Screen */}
          <div className="hidden xl:flex gap-2 items-center text-muted-foreground">
            <div className="border border-muted-foreground flex gap-1 items-center rounded-3xl px-2 py-1.5">
              <Search size={20} />
              <input
                type="text"
                placeholder={t("nav.searchPlaceholder")}
                className="border-0 outline-0 text-sm w-full max-w-40"
              />
            </div>

            <div className="flex items-center">
              {/* Notifications */}
              <Button variant="ghost" className="relative cursor-pointer">
                <Bell />
                <Badge className="absolute top-1 right-1 h-2 w-2 p-0 bg-red-500" />
              </Button>
            </div>

            {/* Language switch for large screen */}
            <div className="hidden xl:flex">
              <LanguageSwitch />
            </div>

            {isLoggedIn ? (
              <Link
                key="Profile"
                to="/$lang/profile"
                params={{ lang: `${lang}` }}
                onClick={() => setMobileOpen(false)}
                className={`flex gap-2 px-2 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive("/profile")
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                {/* <CircleUserRound size={28} strokeWidth={2} className="text-blue-600" /> */}
                <ProfileIcon />
              </Link>
            ) : (
              <div>
                <Link
                  key={"Login"}
                  to="/$lang/login"
                  params={{ lang: `${lang}` }}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-3 "
                >
                  <Button
                    variant={"default"}
                    size={"sm"}
                    className="p-4 shadow-lg  bg-linear-to-r from-blue-600  to-sky-500 hover:from-sky-600 hover:to-blue-600
                   hover:scale-[1.03] hover:shadow-xl"
                  >
                    Login/Signup
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Notification, Search and Login/Profile For Mobile Screen */}
          <div className="flex lg:hidden gap-3  justify-center items-center text-muted-foreground">
            <button>
              <Search className="h-6 w-6" />
            </button>

            <div className="flex items-center">
              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-6 w-6" />
                <Badge className="absolute top-1 right-1 h-2 w-2 p-0 bg-red-500" />
              </Button>
            </div>

            {/* Language switch for tablet screen */}
            <div className="flex xl:hidden">
              <LangSwitch />
            </div>

            <div>
              {/* Mobile Menu Button - Now at the end */}
              <Sheet
                open={mobileOpen}
                onOpenChange={(open) => {
                  setMobileOpen(open);
                  if (!open) {
                    setMenuView("main");
                  }
                }}
              >
                <SheetTrigger asChild>
                  <div className="flex items-center">
                    <button className="lg:hidden ">
                      {mobileOpen ? (
                        <X size={20} />
                      ) : (
                        <Menu className="h-6 w-6" />
                      )}
                    </button>
                  </div>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className={`${menuView === "main" ? "px-6" : "px-4"} w-full `}
                >
                  {/* For screen reader */}
                  <SheetHeader className="sr-only">
                    <SheetTitle>Mobile Navigation Menu</SheetTitle>
                    <SheetDescription>
                      Browse exams, profile, and navigation links
                    </SheetDescription>
                  </SheetHeader>

                  {menuView === "main" && (
                    <div className="flex flex-col space-y-2 mt-15">
                      {isLoggedIn && (
                        <Link
                          key="Profile"
                          to="/$lang/profile"
                          params={{ lang: `${lang}` }}
                          onClick={() => setMobileOpen(false)}
                          className={`gradient-soft-blue-current-affairs flex items-center gap-2 px-2 py-4  mb-5 rounded-md text-sm font-medium transition-colors ${
                            isActive("/profile")
                              ? " text-primary"
                              : "text-title-darkblue hover:text-accent-foreground"
                          }`}
                        >
                          <ProfileIcon />
                          <h3>Profile</h3>
                        </Link>
                      )}

                      {[...headerData, ...moreOptionData].map((item, index) =>
                        item.isChild ? (
                          <button
                            key={index}
                            onClick={() => setMenuView("exam")}
                            className="flex gap-5 items-center px-3 py-3 text-sm font-medium text-title-darkblue"
                          >
                            {lang === "hi" ? item.titleHin : item.titleEn}
                            <ChevronRight
                              size={20}
                              className="text-text-title-darkblue"
                            />
                          </button>
                        ) : (
                          <Link
                            key={index}
                            to={item.url}
                            onClick={() => setMobileOpen(false)}
                            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                              isActive(item.url)
                                ? "bg-primary/10 text-primary"
                                : "text-title-darkblue hover:bg-accent hover:text-accent-foreground"
                            }`}
                          >
                            {lang === "hi" ? item.titleHin : item.titleEn}
                          </Link>
                        ),
                      )}

                      {!isLoggedIn && (
                        <div>
                          <Link
                            key={"Login"}
                            to="/$lang/login"
                            params={{ lang: `${lang}` }}
                            onClick={() => setMobileOpen(false)}
                            className="px-3 py-3 "
                          >
                            <Button
                              variant={"default"}
                              size={"sm"}
                              className="p-4 shadow-lg  bg-linear-to-r from-blue-600  to-sky-500"
                            >
                              Login/Signup
                            </Button>
                          </Link>
                        </div>
                      )}
                    </div>
                  )}

                  {/* LEVEL 2 SCREEN */}
                  {menuView === "exam" && (
                    <ExamNavigation
                      onBack={() => {
                        setMenuView("main");
                      }}
                      onClose={() => {
                        setMobileOpen(false);
                      }}
                    />
                  )}
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

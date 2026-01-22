import { Link, useLocation, useParams } from "@tanstack/react-router";
import {
  Bell,
  ChevronDown,
  CircleUserRound,
  Menu,
  Search,
  X,
} from "lucide-react";

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
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { mockShalaLogo } from "@/assets";
import ProfileIcon from "../ProfileIcon";
import { createHeaderData } from "../data/headerData";
import LangSwitch from "../langSwitch";
import LanguageSwitch from "../LanguageSwitch";
import { useTranslation } from "react-i18next";

// import LangSwitch from "../langSwitch";
// import LanguageToggle from "../toggleSwitch";

function Header() {
  //for translation
  const { t } = useTranslation()

  const isLoggedIn = true;
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const { lang } = useParams({ strict: false })
  const { headerData, moreOptionData, headerDataTablet, moreOptionDataTablet } = createHeaderData(lang || "en")

  return (
    <header className='sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-md  flex justify-center'>
    <div className="w-full px-4 py-2 container ">
      <div className="flex gap-4 justify-between w-full  ">
        {/* Title for all view */}
        <div className="flex justify-center items-center">

          <img src={mockShalaLogo} alt="mockShalaLogo" className="h-7 xl:h-8 w-auto"/>

        </div>

        {/* Quick Access  for Tablet View*/}
        <div className="hidden  md:flex lg:hidden justify-center items-center text-muted-foreground">
          {headerDataTablet.map((item) => (
            <Link 
              key={lang === "hi" ? item.titleHin : item.titleEn} 
              to={item.url} 
              className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors ${isActive(item.url) ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'}`}>
              {lang === "hi" ? item.titleHin : item.titleEn}
            </Link>
          ))}

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
                    <DropdownMenuItem  key={item.url} asChild>              
                      <Link
                        key={lang === "hi" ? item.titleHin : item.titleEn}
                        to={item.url}
                         className={`w-full cursor-pointer p-2 rounded-md text-xs
                          ${isActive(item.url)? 'bg-primary/10 text-primary': 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'}`}
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
         <div className="hidden md:flex lg:hidden gap-2  justify-center items-center text-muted-foreground">
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
          ) : <div>
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
             }
          </div>


        {/* Quick Access  for Large View*/}
        <div className="hidden lg:flex lg:gap-1 xl:gap-2  justify-center items-center text-muted-foreground">
          {headerData.map((item) => (
            <Link 
              key={lang === "hi" ? item.titleHin : item.titleEn} 
              to={item.url}   
              className={`lg:px-1 lg:py-1 xl:px-2 xl:py-2 text-sm font-medium rounded-md transition-colors 
              ${isActive(item.url) ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'}`}>
              
              {lang === "hi" ? item.titleHin : item.titleEn}
            </Link>
          ))}

          {/* more Option */}
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="font-medium">
                  {t("nav.more")}
                  <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 p-2 z-50" align="end">
                <DropdownMenuGroup>
                  {moreOptionData.map((item) => (
                    <DropdownMenuItem  key={item.url} asChild>              
                      <Link
                        key={lang === "hi" ? item.titleHin : item.titleEn}
                        to={item.url}
                         className={`w-full cursor-pointer p-2 my-2 rounded-md
                          ${isActive(item.url)? 'bg-primary/10 text-primary': 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'}`}
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
        <div className="hidden lg:flex gap-2 items-center text-muted-foreground">
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
            <Button variant="ghost" className="relative">
              <Bell />
              <Badge className="absolute top-1 right-1 h-2 w-2 p-0 bg-red-500" />
            </Button>
          </div>

          <div className="hidden xl:flex">
                <LanguageSwitch />
          </div>
          
          <div className="flex xl:hidden">
                  <LangSwitch/>
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
          ) : <div>
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
             }
        </div>

        {/* Notification, Search and Login/Profile For Mobile Screen */}
        <div className="flex md:hidden gap-3  justify-center items-center text-muted-foreground">
          <button>
            <Search className="h-6 w-6" />
          </button>

          <div className="flex items-center">
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-6 w-6"/>
              <Badge className="absolute top-1 right-1 h-2 w-2 p-0 bg-red-500" />
            </Button>
          </div>

          <div >
            {/* Mobile Menu Button - Now at the end */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <div className="flex items-center">
                <button  className="lg:hidden ">
                  {mobileOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </button>
                </div>
              </SheetTrigger>
              <SheetContent side="right" className="w-64 px-4">
                <div className="flex flex-col space-y-2 mt-12">
                  
                  { isLoggedIn && <Link
                    key="Profile"
                    to="/$lang/profile"
                    params={{ lang: `${lang}` }} 
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-2 px-2 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive("/profile")
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    <CircleUserRound className="text-blue-600" />
                    <h3>Profile</h3>
                  </Link>
                  }

                  {[...headerData, ...moreOptionData].map((item) => (
                    <Link
                      key={lang === "hi" ? item.titleHin : item.titleEn}
                      to={item.url}
                      onClick={() => setMobileOpen(false)}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive(item.url)
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      }`}
                    >
                      {lang === "hi" ? item.titleHin : item.titleEn}
                    </Link>
                  ))}

                  {!isLoggedIn && 
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
                    
                  }
                </div>
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

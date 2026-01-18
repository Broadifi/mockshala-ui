import { Link, useLocation } from "@tanstack/react-router";
import {
  Bell,
  BookOpen,
  ChevronDown,
  CircleUserRound,
  Menu,
  Search,
  X,
} from "lucide-react";
import {
  headerData,
  headerDataTablet,
  moreOptionData,
  moreOptionDataTablet,
} from "../data/headerData";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
} from "../ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Badge } from "../ui/badge";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

function Header() {
  const isLoggedIn = true;
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  return (
    <header className='sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-md '>
    <div className="w-full  px-4 py-2 max-w-7xl mx-auto">
      <div className="flex gap-4 justify-between w-full  ">
        {/* Title for all view */}
        <div className="flex gap-1 sm:gap-2 items-center">
          <div
            className="flex items-center justify-center
            w-10 h-10 bg-linear-to-br from-blue-600 to-sky-200 rounded-xl"
          >
            <BookOpen className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold bg-linear-to-r from-indigo-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
            MockShala
          </h1>
        </div>

        {/* Quick Access  for Tablet View*/}
        <div className="hidden md:flex lg:hidden gap-4 justify-center items-center text-muted-foreground">
          {headerDataTablet.map((item) => (
            <Link key={item.title} to={item.url} className="text-sm">
              {item.title}
            </Link>
          ))}

          {/* More Option */}
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="font-medium">
                  More
                  <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 p-2 z-50" align="end">
                <DropdownMenuGroup>
                  {moreOptionDataTablet.map((item) => (
                    <div className="my-2">
                      <Link
                        key={item.title}
                        to={item.url}
                        className="text-sm text-muted-foreground my-2"
                      >
                        {item.title}
                      </Link>
                    </div>
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
                    to="/profile"
                    onClick={() => setMobileOpen(false)}
                    className={`flex gap-2 px-2 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive("/profile")
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    <CircleUserRound size={25} strokeWidth={2} className="text-blue-600" />
                  </Link>
          ) : <div>
                <Link
                    key={"Login"}
                    to={"/login"}
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
        <div className="hidden lg:flex lg:gap-2 xl:gap-4  justify-center items-center text-muted-foreground">
          {headerData.map((item) => (
            <Link key={item.title} to={item.url} className="text-sm">
              {item.title}
            </Link>
          ))}

          {/* More Option */}
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="font-medium">
                  More
                  <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 p-2 z-50" align="end">
                <DropdownMenuGroup>
                  {moreOptionData.map((item) => (
                    <div className="my-2">
                      <Link
                        key={item.title}
                        to={item.url}
                        className="text-sm text-muted-foreground my-2"
                      >
                        {item.title}
                      </Link>
                    </div>
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
              placeholder="Search exams, tests..."
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

          {isLoggedIn ? (
            <Link
                    key="Profile"
                    to="/profile"
                    onClick={() => setMobileOpen(false)}
                    className={`flex gap-2 px-2 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive("/profile")
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    <CircleUserRound size={28} strokeWidth={2} className="text-blue-600" />
                  </Link>
          ) : <div>
                <Link
                    key={"Login"}
                    to={"/login"}
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
            <Search className="h-5 w-5" />
          </button>

          <div className="flex items-center">
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell />
              <Badge className="absolute top-1 right-1 h-2 w-2 p-0 bg-red-500" />
            </Button>
          </div>

          <div >
            {/* Mobile Menu Button - Now at the end */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon-lg" className="lg:hidden">
                  {mobileOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64 px-4">
                <div className="flex flex-col space-y-2 mt-12">
                  
                  { isLoggedIn && <Link
                    key="Profile"
                    to="/profile"
                    onClick={() => setMobileOpen(false)}
                    className={`flex gap-2 px-2 py-2 rounded-md text-sm font-medium transition-colors ${
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
                      key={item.title}
                      to={item.url}
                      onClick={() => setMobileOpen(false)}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive(item.url)
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      }`}
                    >
                      {item.title}
                    </Link>
                  ))}

                  {!isLoggedIn && 
                    <div>
                      <Link
                          key={"Login"}
                          to={"/login"}
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

import { Link } from "@tanstack/react-router";
import {
  Bell,
  BookOpen,
  ChevronDown,
  CircleUserRound,
  Menu,
  Search,
} from "lucide-react";
import { headerData, moreOptionData } from "../data/headerData";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
} from "../ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";

function Header() {
  return (
    <div className="w-full bg-background shadow-md mb-5 flex justify-center">
      <div className="flex justify-between w-full bg-background px-4 py-2 max-w-7xl ">
        {/* Title */}
        <div className="flex gap-1 sm:gap-2 items-center">
          <div
            className="flex items-center justify-center
            w-10 h-10 bg-linear-to-br from-blue-600 to-sky-200 rounded-xl"
          >
            <BookOpen className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
            MockShala
          </h1>
        </div>

        {/* Quick Access  for Desktop View*/}
        <div className="hidden lg:flex gap-4 justify-center items-center text-muted-foreground">
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
              <DropdownMenuContent
                className="w-48 p-2 z-50"
                align="end"
              >
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

        {/* For Large Screen */}
        <div className="hidden lg:flex gap-4 items-center text-muted-foreground">
          <div className="border border-muted-foreground flex gap-1 items-center rounded-3xl px-2 py-1.5">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search exams, tests..."
              className="border-0 outline-0 text-sm w-full max-w-40"
            />
          </div>
          <Bell />
          <Button variant={"default"} className="rounded-2xl bg-blue-600">
            Login
          </Button>
        </div>

        {/* For Mobile Screen */}
        <div className="flex gap-4 lg:hidden justify-center items-center text-muted-foreground">
          <button>
            <Search />
          </button>

          <CircleUserRound />

          <Menu />
        </div>
      </div>
    </div>
  );
}

export default Header;

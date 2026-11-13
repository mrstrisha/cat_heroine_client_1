
"use client";

import { authClient } from "@/lib/auth-client";
import React from "react";
import { useTheme } from "@teispace/next-themes";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const Navbar = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleSignout = async () => {
    await authClient.signOut();
  };

  return (
    <div className="w-full bg-white dark:bg-zinc-900 border-b border-[#CFE1B9] dark:border-zinc-700 shadow-sm transition-colors duration-300">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-[#728156] text-white p-2 rounded-xl">
            <span className="text-xl">🌿</span>
          </div>

          <h1 className="text-2xl font-bold text-[#728156] dark:text-[#CFE1B9]">
            Car Heroine
          </h1>
        </Link>

        {/* Upcoming Events */}
        <div className="hidden md:flex items-center">
          <Link
            href="/upcomingEvents"
            className="font-semibold text-gray-700 dark:text-gray-200 hover:text-[#728156] dark:hover:text-[#B6C99B] transition"
          >
            Upcoming Events
          </Link>
        </div>

        {/* Theme and Profile */}
        <div className="flex items-center gap-3">

          {/* Theme Toggle */}

<Button
  type="button"
  onClick={toggleTheme}
  aria-label="Toggle theme"
  className={`relative flex h-10 w-[76px] shrink-0 items-center rounded-full border p-1 transition-all duration-300 ${
    theme === "dark"
      ? "justify-end border-[#728156] bg-[#728156]"
      : "justify-start border-[#CFE1B9] bg-[#E7F5DC]"
  }`}
>
  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-base shadow-md transition-all duration-300">
    {theme === "dark" ? "🌙" : "☀️"}
  </span>
</Button>

          {user ? (
            <Popover>
              <PopoverTrigger
                render={
                  <button className="rounded-full cursor-pointer">
                    <Avatar className="border-2 border-[#98A77C] dark:border-[#B6C99B]">
                      <AvatarImage
                        referrerPolicy="no-referrer"
                        src={user?.image}
                      />
                      <AvatarFallback className="bg-[#E7F5DC] dark:bg-zinc-700 text-[#728156] dark:text-[#CFE1B9]">
                        {user?.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                }
              />

              <PopoverContent className="w-64 bg-white dark:bg-zinc-900 border-[#CFE1B9] dark:border-zinc-700 text-gray-800 dark:text-gray-100">

                <PopoverHeader>
                  <PopoverTitle className="text-[#728156] dark:text-[#CFE1B9]">
                    {user?.name}
                  </PopoverTitle>
                </PopoverHeader>

                <div className="flex flex-col gap-3 mt-3">

                  <Link
                    href="/createEvent"
                    className="hover:text-[#728156] dark:hover:text-[#B6C99B] transition"
                  >
                    Create Event
                  </Link>

                  <Link
                    href="/managEvent"
                    className="hover:text-[#728156] dark:hover:text-[#B6C99B] transition"
                  >
                    Manage Events
                  </Link>

                  <Link
                    href="/joinEvent"
                    className="hover:text-[#728156] dark:hover:text-[#B6C99B] transition"
                  >
                    Joined Events
                  </Link>

                  <Button
                    onClick={handleSignout}
                    variant="destructive"
                    className="w-full"
                  >
                    Sign Out
                  </Button>

                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <>
              <Link href="/signUp">
                <Button className="bg-[#728156] hover:bg-[#5f6e48] text-white">
                  Sign Up
                </Button>
              </Link>

              <Link href="/login">
                <Button
                  variant="outline"
                  className="border-[#728156] dark:border-[#B6C99B] text-[#728156] dark:text-[#CFE1B9] bg-transparent dark:hover:bg-zinc-800"
                >
                  Log In
                </Button>
              </Link>
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default Navbar;

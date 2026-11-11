
'use client'

import { authClient } from '@/lib/auth-client'
import React from 'react'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Button } from '@/components/ui/button'
import Link from 'next/link'

const Navbar = () => {

  const { data: session } = authClient.useSession();

  const user = session?.user;

  const handleSignout = () => {
    authClient.signOut();
  }

  return (
    <div className="w-full bg-white border-b shadow-sm">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo and Website Name */}

        <Link href="/" className="flex items-center gap-2">

          <div className="bg-[#728156] text-white p-2 rounded-xl">
            <span className="text-xl">🌿</span>
          </div>

          <h1 className="text-2xl font-bold text-[#728156]">
            Car Heroine
          </h1>

        </Link>


        {/* Upcoming Events */}

        <div className="hidden md:flex items-center">

          <Link
            href="/upcomingEvents"
            className="font-semibold text-gray-700 hover:text-[#728156] transition"
          >
            Upcoming Events
          </Link>

        </div>


        {/* Login / Profile */}

        <div className="flex items-center gap-3">

          {
            user ?

            <Popover>

            <PopoverTrigger
  render={
    <button className="rounded-full cursor-pointer">
      <Avatar className="border-2 border-[#98A77C]">
        <AvatarImage
          referrerPolicy="no-referrer"
          src={user?.image}
        />
        <AvatarFallback>
          {user?.name?.charAt(0) || "U"}
        </AvatarFallback>
      </Avatar>
    </button>
  }
/>
              <PopoverContent className="w-64">

                <PopoverHeader>

                  <PopoverTitle>
                    {user?.name}
                  </PopoverTitle>

                </PopoverHeader>

                <div className="flex flex-col gap-3 mt-3">

                  <Link href="/createEvent">
                    Create Event
                  </Link>

                  <Link href="/managEvent">
                    Manage Events
                  </Link>

                  <Link href="/joinEvent">
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

            :

            <>

              <Link href="/signUp">
                <Button
                  className="bg-[#728156] hover:bg-[#5f6e48] text-white"
                >
                  Sign Up
                </Button>
              </Link>

              <Link href="/login">
                <Button
                  variant="outline"
                  className="border-[#728156] text-[#728156]"
                >
                  Log In
                </Button>
              </Link>

            </>

          }

        </div>

      </div>

    </div>
  )
}

export default Navbar

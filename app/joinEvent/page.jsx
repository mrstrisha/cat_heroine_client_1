
'use client'

import React, { useState } from 'react'
import { authClient } from '@/lib/auth-client'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const JoinedEvents = () => {

  const { data: session, isPending } = authClient.useSession()
  const user = session?.user

  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(false)
  const [loaded, setLoaded] = useState(false)

  const loadEvents = async () => {
    if (!user?.email) return

    setLoading(true)

    try {
      const res = await fetch(
        `http://localhost:8000/joinedEvents/${encodeURIComponent(user.email)}`
      )

      const data = await res.json()

      if (res.ok) {
        setEvents(data)
      } else {
        console.log(data.message)
      }
    } catch (error) {
      console.log('Failed to load joined events:', error)
    } finally {
      setLoading(false)
      setLoaded(true)
    }
  }

  if (isPending) {
    return <div className="text-center py-20">Loading...</div>
  }

  if (!user) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Please Login First</h2>
        <Link href="/login">
          <Button className="mt-5">Login</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8FAF5] px-6 py-12 md:px-12">

      <div className="max-w-7xl mx-auto">

        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-[#52613C]">
            My Joined Events
          </h1>

          <p className="text-gray-500 mt-2">
            Events you have successfully joined.
          </p>

          <Button
            onClick={loadEvents}
            disabled={loading}
            className="mt-5 bg-[#728156] hover:bg-[#5F6E48]"
          >
            {loading ? 'Loading...' : 'Load My Events'}
          </Button>
        </div>

        {!loaded ? (
          <p className="text-gray-500">
            Click "Load My Events" to see your joined events.
          </p>
        ) : events.length === 0 ? (

          <div className="text-center py-20 bg-white rounded-2xl">
            <h2 className="text-2xl font-semibold text-gray-700">
              No Joined Events Yet!
            </h2>
            <p className="text-gray-500 mt-3">
              Join an event to see it here.
            </p>
            <Link href="/upcomingEvents">
              <Button className="mt-5 bg-[#728156]">
                Explore Events
              </Button>
            </Link>
          </div>

        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">

            {events.map((event) => (

              <div
                key={event._id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#CFE1B9]"
              >

                <div className="relative h-52">
                  <img
                    src={event.thumbnail}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-5">

                  <span className="text-sm text-[#728156] font-semibold">
                    {event.eventType}
                  </span>

                  <h2 className="text-xl font-bold text-gray-800 mt-2">
                    {event.title}
                  </h2>

                  <p className="text-gray-500 mt-3">
                    📍 {event.location}
                  </p>

                  <p className="text-gray-500 mt-2">
                    📅 {new Date(event.eventDate).toLocaleDateString()}
                  </p>

                  <Link href={`/eventDatail/${event._id}`}>
                    <Button className="w-full mt-5 bg-[#728156] hover:bg-[#5F6E48]">
                      View Event
                    </Button>
                  </Link>

                </div>
              </div>

            ))}

          </div>
        )}

      </div>
    </div>
  )
}

export default JoinedEvents

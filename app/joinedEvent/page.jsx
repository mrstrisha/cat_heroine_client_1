
'use client'

import React, { useState } from 'react'
import { authClient } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

const JoinEvent = ({ eventId }) => {

  const { data: session } = authClient.useSession();

  const user = session?.user;

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleJoin = async () => {

    // Login check
    if (!user) {
      router.push('/login');
      return;
    }

    setLoading(true);

    try {

      const res = await fetch('http://localhost:8000/joinEvent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventId: eventId,
          userEmail: user.email,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Successfully joined the event!');
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error('Something went wrong!');
    } finally {
      setLoading(false);
    }

  }

  return (
    <Button
      onClick={handleJoin}
      disabled={loading}
      className="w-full bg-[#728156] hover:bg-[#5F6E48] text-white py-6 rounded-xl font-semibold"
    >
      {loading ? 'Joining...' : 'Join Event'}
    </Button>
  )
}

export default JoinEvent

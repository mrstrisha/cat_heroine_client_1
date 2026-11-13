
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
  if (!user) {
    router.push('/login');
    return;
  }

  setLoading(true);

  try {
    const tokenResponse = await authClient.token();
    const token = tokenResponse.data?.token;

    if (tokenResponse.error || !token) {
      toast.error('Please login first!');
      router.push('/login');
      return;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/joinEvent`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          eventId: eventId,
        }),
      }
    );

    const data = await res.json();

    if (res.ok) {
      toast.success('Successfully joined the event!');
    } else {
      toast.error(data.message || 'Failed to join event');
    }

  } catch (error) {
    console.error(error);
    toast.error('Something went wrong!');
  } finally {
    setLoading(false);
  }
};

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



import Image from "next/image";

import EditPage from "@/app/component/EditPage";
import DeletePage from "@/app/component/DeletePage";
import Link from "next/link";
import { Button } from "@/components/ui/button";


const EventDetailPage = async ({ params }) => {
  const { id } = await params;

  let data;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/eventDetail/${id}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch event details");
    }

    data = await res.json();

  } catch (error) {
    console.error("Event Fetch Error:", error);

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex items-center justify-center px-5 transition-colors duration-300">
        <h2 className="text-2xl font-bold text-red-500">
          Failed to load event details!
        </h2>
      </div>
    );
  }

  if (!data || !data._id) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex items-center justify-center transition-colors duration-300">
        <h2 className="text-2xl font-bold text-gray-700 dark:text-white">
          Event Not Found!
        </h2>
      </div>
    );
  }

  const formattedDate = data.eventDate
    ? new Date(data.eventDate).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Date not available";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 py-12 px-4 transition-colors duration-300">

      <div className="max-w-6xl mx-auto">

        {/* Main Content */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-sm overflow-hidden border border-transparent dark:border-zinc-800">

          {/* Event Image */}
          <div className="relative h-[280px] md:h-[450px]">

            <Image
              src={data.thumbnail}
              alt={data.title || "Event Image"}
              className="w-full h-full object-cover"
              width={1200}
              height={600}
              priority
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

            <div className="absolute bottom-8 left-6 md:left-10">

              <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                {data.eventType}
              </span>

              <h1 className="text-3xl md:text-5xl font-bold text-white mt-4">
                {data.title}
              </h1>

            </div>
          </div>

          {/* Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 p-6 md:p-10">

            {/* Description */}
            <div className="lg:col-span-2">

              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-5">
                About This Event
              </h2>

              <p className="text-gray-600 dark:text-gray-300 leading-8 text-base md:text-lg whitespace-pre-line">
                {data.description}
              </p>

              {/* Event Information */}
              <div className="mt-10 border-t border-gray-100 dark:border-zinc-700 pt-8">

                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-5">
                  Event Information
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                  {/* Date */}
                  <div className="bg-blue-50 dark:bg-blue-950/40 p-5 rounded-2xl">
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
                      📅 Event Date
                    </p>

                    <h3 className="font-semibold text-gray-800 dark:text-white">
                      {formattedDate}
                    </h3>
                  </div>

                  {/* Location */}
                  <div className="bg-purple-50 dark:bg-purple-950/40 p-5 rounded-2xl">
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
                      📍 Location
                    </p>

                    <h3 className="font-semibold text-gray-800 dark:text-white">
                      {data.location}
                    </h3>
                  </div>

                  {/* Category */}
                  <div className="bg-orange-50 dark:bg-orange-950/40 p-5 rounded-2xl">
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
                      🏷️ Category
                    </p>

                    <h3 className="font-semibold text-gray-800 dark:text-white">
                      {data.eventType}
                    </h3>
                  </div>

                </div>
              </div>

            </div>

            {/* Sidebar */}
            <div>

              <div className="bg-gray-50 dark:bg-zinc-800 border border-gray-100 dark:border-zinc-700 rounded-2xl p-6 sticky top-8">

                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
                  Event Overview
                </h2>

                <div className="space-y-5">

                  {/* Event Name */}
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      Event Name
                    </p>

                    <p className="font-semibold text-gray-800 dark:text-white">
                      {data.title}
                    </p>
                  </div>

                  {/* Date */}
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      Date
                    </p>

                    <p className="font-semibold text-gray-800 dark:text-white">
                      {formattedDate}
                    </p>
                  </div>

                  {/* Location */}
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      Location
                    </p>

                    <p className="font-semibold text-gray-800 dark:text-white">
                      {data.location}
                    </p>
                  </div>

                  {/* Category */}
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      Category
                    </p>

                    <p className="font-semibold text-blue-600 dark:text-blue-400">
                      {data.eventType}
                    </p>
                  </div>

                </div>

              
{/* Event Action Buttons */}

<div className="mt-10 rounded-2xl border border-[#DCE8D0] bg-[#F8FAF5] p-5 md:p-6">

  <h3 className="text-lg font-bold text-[#35452B] mb-2">
    Event Actions
  </h3>

  <p className="text-sm text-gray-500 mb-6">
    Manage this event or become a part of the community.
  </p>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

    {/* Edit Button */}
    <div className="w-full [&_button]:!w-full [&_button]:!h-12 [&_button]:!rounded-xl [&_button]:!border [&_button]:!border-[#B6C99B] [&_button]:!bg-white [&_button]:!text-[#52613C] [&_button]:hover:!bg-[#E7F5DC] [&_button]:!font-semibold [&_button]:!shadow-none">
      <EditPage event={data} />
    </div>

    {/* Delete Button */}
    <div className="w-full [&_button]:!w-full [&_button]:!h-12 [&_button]:!rounded-xl [&_button]:!border [&_button]:!border-red-200 [&_button]:!bg-white [&_button]:!text-red-600 [&_button]:hover:!bg-red-50 [&_button]:!font-semibold [&_button]:!shadow-none">
      <DeletePage id={id} />
    </div>

  </div>

  {/* Join Button */}
<div className="mt-5 [&_button]:!w-full [&_button]:!h-14 [&_button]:!rounded-xl [&_button]:!bg-[#728156] [&_button]:hover:!bg-[#5F6E48] [&_button]:!text-white [&_button]:!text-base [&_button]:!font-bold [&_button]:!shadow-md">
<Link href={`/joinEvent?eventId=${id}`}>
    <Button>
     Join Event
    </Button>
  </Link>
</div>


                </div>

              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default EventDetailPage;


import Image from "next/image";
import Link from "next/link";

import EditPage from "@/app/component/EditPage";
import DeletePage from "@/app/component/DeletePage";

const ManagEvent = async () => {
  let data = [];

  try {
    const res = await fetch("http://localhost:8000/ManageEvent", {
      cache: "no-store",
    });

    if (res.ok) {
      data = await res.json();
    }
  } catch (error) {
    console.log("Failed to fetch events:", error);
  }

  return (
    <div className="min-h-screen bg-[#F8FAF5] dark:bg-zinc-950 px-6 py-12 md:px-10 transition-colors duration-300">

      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12">

        <p className="text-sm font-semibold uppercase tracking-[4px] text-[#88976C] dark:text-[#B6C99B]">
          Community Impact
        </p>

        <h1 className="mt-2 text-3xl font-bold text-[#52613C] dark:text-white md:text-4xl">
          Manage Events
        </h1>

        <p className="mt-3 text-gray-500 dark:text-gray-400">
          Explore, edit and manage your community events.
        </p>

      </div>

      {/* Event Cards */}
      <div className="max-w-7xl mx-auto">

        {data.length > 0 ? (

          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">

            {data.map((event) => (

              <div
                key={event._id}
                className="group overflow-hidden rounded-3xl bg-white dark:bg-zinc-900 border border-[#E1EBD6] dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all duration-300"
              >

                {/* Event Image */}
                <div className="relative h-60 overflow-hidden">

                  <Image
                    src={event.thumbnail}
                    alt={event.title || "Event Image"}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  <span className="absolute top-4 left-4 rounded-full bg-white/95 dark:bg-zinc-900/95 px-4 py-2 text-xs font-bold text-[#728156] dark:text-[#B6C99B] shadow">
                    {event.eventType}
                  </span>

                </div>

                {/* Card Content */}
                <div className="p-6">

                  <h2 className="text-xl font-bold text-[#35452B] dark:text-white line-clamp-1">
                    {event.title}
                  </h2>

                  <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 line-clamp-2 leading-6">
                    {event.description}
                  </p>

                  <div className="mt-5 space-y-3 text-sm text-gray-600 dark:text-gray-400">

                    <p>
                      📍 {event.location}
                    </p>

                    <p>
                      📅 {event.eventDate}
                    </p>

                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-3 gap-2 mt-7 pt-5 border-t border-gray-100 dark:border-zinc-700">

                    {/* View Button */}
                    <Link
                      href={`/eventDatail/${event._id}`}
                      className="flex items-center justify-center gap-1 rounded-xl bg-[#728156] hover:bg-[#5F6E48] text-white py-3 text-sm font-semibold transition"
                    >
                      <span>View</span>
                      <span>↗</span>
                    </Link>

                    {/* Edit Button */}
                    <div className="flex items-center justify-center rounded-xl border border-[#B6C99B] dark:border-[#728156] bg-[#F8FAF5] dark:bg-zinc-800 hover:bg-[#E7F5DC] dark:hover:bg-zinc-700 transition overflow-hidden [&_button]:!w-full [&_button]:!h-full [&_button]:!min-h-[44px] [&_button]:!rounded-xl [&_button]:!border-0 [&_button]:!bg-transparent [&_button]:!text-[#52613C] [&_button]:dark:!text-[#B6C99B] [&_button]:!text-sm [&_button]:!font-semibold [&_button]:!shadow-none">

                      <EditPage event={event} />

                    </div>

                    {/* Delete Button */}
                    <div className="flex items-center justify-center rounded-xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/40 hover:bg-red-100 dark:hover:bg-red-950/70 transition overflow-hidden [&_button]:!w-full [&_button]:!h-full [&_button]:!min-h-[44px] [&_button]:!rounded-xl [&_button]:!border-0 [&_button]:!bg-transparent [&_button]:!text-red-600 [&_button]:dark:!text-red-400 [&_button]:!text-sm [&_button]:!font-semibold [&_button]:!shadow-none">

                      <DeletePage id={event._id} />

                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>

        ) : (

          /* Empty State */
          <div className="rounded-3xl bg-white dark:bg-zinc-900 border border-[#E1EBD6] dark:border-zinc-800 py-20 text-center">

            <div className="text-5xl mb-5">🌱</div>

            <h2 className="text-2xl font-bold text-[#52613C] dark:text-white">
              No Events Found
            </h2>

            <p className="mt-3 text-gray-500 dark:text-gray-400">
              You haven't created any community events yet.
            </p>

            <Link
              href="/CreateEvent"
              className="inline-block mt-6 rounded-xl bg-[#728156] hover:bg-[#5F6E48] px-7 py-3 text-white font-semibold transition"
            >
              Create Your First Event
            </Link>

          </div>

        )}

      </div>

    </div>
  );
};

export default ManagEvent;

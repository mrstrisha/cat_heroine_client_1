
import Image from "next/image";
import Link from "next/link";

const ManagEvent = async () => {
  const res = await fetch("http://localhost:8000/manageEvent", {
    cache: "no-store",
  });

  const data = await res.json();

  return (
    <div className="min-h-screen bg-[#F7F9F4] dark:bg-zinc-950 px-6 py-12 md:px-10 transition-colors duration-300">

      {/* Header */}
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-[4px] text-[#88976C] dark:text-[#B6C99B]">
          Community Impact
        </p>

        <h1 className="mt-2 text-3xl font-bold text-[#728156] dark:text-white md:text-4xl">
          Manage Events
        </h1>

        <p className="mt-2 text-[#88976C] dark:text-gray-400">
          Explore and manage all your community events.
        </p>
      </div>

      {/* Event Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

        {data.map((event) => (
          <div
            key={event._id}
            className="group relative h-[420px] overflow-hidden rounded-2xl bg-[#728156] shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
          >

            {/* Background Image */}
            <Image
              src={event.thumbnail}
              alt={event.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              height={300}
              width={200}
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/10 to-black/90" />

            {/* Card Content */}
            <div className="relative flex h-full flex-col justify-between p-6 text-white">

              {/* Top Content */}
              <div>
                <span className="inline-block rounded-full border border-white/30 bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur-md">
                  {event.eventType}
                </span>

                <h2 className="mt-5 text-2xl font-bold leading-tight">
                  {event.title}
                </h2>

                <p className="mt-3 line-clamp-3 text-sm leading-6 text-white/80">
                  {event.description}
                </p>
              </div>

              {/* Bottom Content */}
              <div>
                <div className="mb-5 space-y-2 text-sm text-white/90">
                  <p>
                    📍 {event.location}
                  </p>

                  <p>
                    📅 {event.eventDate}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-white/30 pt-4">

                  <span className="text-xs font-medium tracking-wider text-white/80">
                    EVENT Detail
                  </span>

                  <Link
                    href={`/eventDatail/${event._id}`}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#728156] transition-all duration-300 group-hover:bg-[#B6C99B]"
                  >
                    <span className="text-2xl">→</span>
                  </Link>

                </div>
              </div>

            </div>
          </div>
        ))}

      </div>

      {/* Empty State */}
      {data.length === 0 && (
        <div className="py-20 text-center">
          <h2 className="text-2xl font-bold text-[#728156] dark:text-white">
            No Events Found
          </h2>

          <p className="mt-2 text-[#88976C] dark:text-gray-400">
            There are no events available right now.
          </p>
        </div>
      )}

    </div>
  );
};

export default ManagEvent;

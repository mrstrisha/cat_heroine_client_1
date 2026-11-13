
import Link from "next/link";

const UpcomingEevents = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ManageEvent`, {
    cache: "no-store",
  });

  const data = await res.json();

  // MongoDB theke sob event neya
  const allEvents = Array.isArray(data) ? data : data.result || [];

  // Ajker date ber kora
  const today = new Date();
  const todayDate = `${today.getFullYear()}-${String(
    today.getMonth() + 1
  ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  // Sudhu upcoming events filter kora
  const upcomingEvents = allEvents
    .filter((event) => event.eventDate?.slice(0, 10) >= todayDate)
    .sort((a, b) => a.eventDate.localeCompare(b.eventDate));

  return (
    <div className="min-h-screen bg-[#F7F9F4] dark:bg-zinc-950 px-5 py-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[#88976C] font-semibold tracking-widest uppercase text-sm mb-3">
            Together We Can Make A Difference
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-[#39452D] dark:text-white mb-4">
            Upcoming Events
          </h1>

          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Discover meaningful community events near you.
            Join hands and make a positive difference in society.
          </p>
        </div>

        {/* Event Count */}
        <div className="flex justify-between items-center mb-7">
          <h2 className="text-xl font-bold text-[#39452D] dark:text-white">
            Explore Events
          </h2>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            {upcomingEvents.length} Events Available
          </p>
        </div>

        {/* Event Cards */}
        {upcomingEvents.length === 0 ? (
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-12 text-center shadow-sm border border-transparent dark:border-zinc-800">
            <h2 className="text-2xl font-bold text-[#39452D] dark:text-white mb-3">
              No Upcoming Events
            </h2>

            <p className="text-gray-500 dark:text-gray-400">
              There are no upcoming events at the moment.
              Please check back later!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => (
              <div
                key={event._id}
                className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 border border-[#E5EBDD] dark:border-zinc-800 flex flex-col"
              >
                {/* Event Image */}
                <div className="relative h-56 w-full overflow-hidden">
                  <img
                    src={event.thumbnail}
                    alt={event.title}
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />

                  <span className="absolute top-4 left-4 bg-[#728156] text-white text-xs font-semibold px-4 py-2 rounded-full">
                    {event.eventType}
                  </span>
                </div>

                {/* Event Information */}
                <div className="p-6 flex flex-col flex-1">
                  <h2 className="text-xl font-bold text-[#39452D] dark:text-white mb-3">
                    {event.title}
                  </h2>

                  <div className="space-y-3 text-sm text-gray-500 dark:text-gray-400 mb-6">
                    <p className="flex items-center gap-2">
                      <span>📍</span>
                      {event.location}
                    </p>

                    <p className="flex items-center gap-2">
                      <span>📅</span>
                      {new Date(event.eventDate + "T00:00:00").toLocaleDateString(
                        "en-GB",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }
                      )}
                    </p>
                  </div>

                  {/* Event Buttons */}
                  <div className="mt-auto flex gap-3">
                    <Link
                      href={`/eventDatail/${event._id}`}
                      className="flex-1 text-center border border-[#728156] text-[#728156] dark:text-[#B6C99B] dark:border-[#98A77C] hover:bg-[#F0F4EA] dark:hover:bg-zinc-800 font-semibold py-3 rounded-xl transition"
                    >
                      View Event
                    </Link>

                    <Link
                      href={`/eventDatail/${event._id}`}
                      className="flex-1 text-center bg-[#728156] hover:bg-[#5F6E48] text-white font-semibold py-3 rounded-xl transition"
                    >
                      Join Event
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingEevents;



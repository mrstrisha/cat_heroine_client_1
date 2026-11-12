
import Link from "next/link";
import HeroSection from "./component/HeroSection";
import Footer from "./component/Footer";

const Home = async () => {
  let events = [];

  try {
    const res = await fetch("http://localhost:8000/recentEvents", {
      cache: "no-store",
    });

    if (res.ok) {
      events = await res.json();
    }
  } catch (error) {
    console.log("Failed to load events:", error);
  }

  return (
    <main className="bg-white dark:bg-zinc-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <section className="py-20 px-6 md:px-10 max-w-7xl mx-auto">

        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-[#82965F] font-bold uppercase tracking-widest text-sm">
            What We Do
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-[#35452B] dark:text-white mt-3">
            Making Community Service Easier
          </h2>

          <p className="text-gray-500 dark:text-gray-400 mt-4 leading-7">
            Connect with people, discover meaningful activities
            and take part in creating positive changes.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-7">

          {[
            {
              icon: "🌱",
              title: "Discover Events",
              description: "Find meaningful community events and explore opportunities to make a difference.",
            },
            {
              icon: "🤝",
              title: "Join Community",
              description: "Connect with like-minded people and work together towards a better society.",
            },
            {
              icon: "🌍",
              title: "Create Impact",
              description: "Create your own events and inspire others to participate in positive change.",
            },
          ].map((feature, index) => (

            <div
              key={index}
              className="bg-[#F8FAF5] dark:bg-zinc-900 border border-[#E1EBD6] dark:border-zinc-800 rounded-3xl p-8 hover:shadow-xl hover:-translate-y-2 transition duration-300"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#E7F5DC] dark:bg-zinc-800 flex items-center justify-center text-3xl">
                {feature.icon}
              </div>

              <h3 className="text-xl font-bold text-[#35452B] dark:text-white mt-6">
                {feature.title}
              </h3>

              <p className="text-gray-500 dark:text-gray-400 leading-7 mt-3">
                {feature.description}
              </p>
            </div>

          ))}

        </div>
      </section>

      {/* Recent Upcoming Events */}
      <section className="bg-[#F6F9F1] dark:bg-zinc-900 py-20 px-6 md:px-10">

        <div className="max-w-7xl mx-auto">

          <div className="flex flex-col md:flex-row justify-between md:items-end gap-5 mb-12">

            <div>
              <p className="text-[#82965F] font-bold uppercase tracking-widest text-sm">
                Be Part of Something Good
              </p>

              <h2 className="text-3xl md:text-4xl font-bold text-[#35452B] dark:text-white mt-3">
                Recent Upcoming Events
              </h2>

              <p className="text-gray-500 dark:text-gray-400 mt-3">
                Find your next opportunity to make an impact.
              </p>
            </div>

            <Link
              href="/upcomingEvents"
              className="text-[#728156] dark:text-[#B6C99B] font-bold hover:underline"
            >
              View All Events →
            </Link>

          </div>

          {events.length === 0 ? (

            <div className="text-center py-16 bg-white dark:bg-zinc-950 rounded-3xl border border-gray-100 dark:border-zinc-800">
              <p className="text-5xl">🌱</p>
              <h3 className="text-xl font-bold text-[#35452B] dark:text-white mt-4">
                No Upcoming Events Yet
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                New community events will appear here.
              </p>
            </div>

          ) : (

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

              {events.map((event) => (

                <div
                  key={event._id}
                  className="bg-white dark:bg-zinc-950 rounded-3xl overflow-hidden border border-[#E1EBD6] dark:border-zinc-800 shadow-sm hover:shadow-xl transition duration-300 group"
                >

                  <div className="relative overflow-hidden">
                    <img
                      src={event.thumbnail}
                      alt={event.title}
                      className="w-full h-56 object-cover group-hover:scale-105 transition duration-500"
                    />

                    <span className="absolute top-4 left-4 bg-white/95 text-[#728156] px-4 py-2 rounded-full text-xs font-bold">
                      {event.eventType}
                    </span>
                  </div>

                  <div className="p-6">

                    <h3 className="text-xl font-bold text-[#35452B] dark:text-white line-clamp-1">
                      {event.title}
                    </h3>

                    <p className="text-gray-500 dark:text-gray-400 mt-3">
                      📍 {event.location}
                    </p>

                    <p className="text-gray-500 dark:text-gray-400 mt-2">
                      📅 {new Date(event.eventDate).toLocaleDateString("en-GB")}
                    </p>

                    <Link
                      href={`/eventDatail/${event._id}`}
                      className="block text-center bg-[#728156] hover:bg-[#5F6E48] text-white py-3 rounded-xl mt-6 font-semibold transition"
                    >
                      View Details →
                    </Link>

                  </div>
                </div>

              ))}

            </div>

          )}

        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 px-6 md:px-10 max-w-7xl mx-auto">

        <div className="text-center mb-12">
          <p className="text-[#82965F] font-bold uppercase tracking-widest text-sm">
            Moments That Matter
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-[#35452B] dark:text-white mt-3">
            Together, We Make A Difference
          </h2>

          <p className="text-gray-500 dark:text-gray-400 mt-4">
            A glimpse of people coming together for a better world.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          <div className="col-span-2 row-span-2 overflow-hidden rounded-3xl">
            <img
              src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=900"
              alt="Volunteers helping the community"
              className="w-full h-full min-h-[300px] object-cover hover:scale-105 transition duration-500"
            />
          </div>

          <div className="overflow-hidden rounded-3xl">
            <img
              src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600"
              alt="Planting trees"
              className="w-full h-48 object-cover hover:scale-105 transition duration-500"
            />
          </div>

          <div className="overflow-hidden rounded-3xl">
            <img
              src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600"
              alt="Community volunteers"
              className="w-full h-48 object-cover hover:scale-105 transition duration-500"
            />
          </div>

          <div className="overflow-hidden rounded-3xl">
            <img
              src="https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=600"
              alt="Volunteers working together"
              className="w-full h-48 object-cover hover:scale-105 transition duration-500"
            />
          </div>

          <div className="overflow-hidden rounded-3xl">
            <img
              src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600"
              alt="Community donation activity"
              className="w-full h-48 object-cover hover:scale-105 transition duration-500"
            />
          </div>

        </div>
      </section>

      {/* Newsletter Section */}
      <section className="px-6 md:px-10 pb-20">

        <div className="max-w-7xl mx-auto bg-[#E7F5DC] dark:bg-zinc-900 border border-[#CFE1B9] dark:border-zinc-800 rounded-[32px] px-7 py-16 md:px-16 text-center">

          <p className="text-[#728156] dark:text-[#B6C99B] font-bold uppercase tracking-widest text-sm">
            Stay Connected
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-[#35452B] dark:text-white mt-4">
            Be The First To Know
          </h2>

          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto mt-4 leading-7">
            Get updates about upcoming community events,
            volunteering opportunities and inspiring stories.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto mt-8">

            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 bg-white dark:bg-zinc-800 dark:text-white dark:placeholder:text-gray-400 border border-[#CFE1B9] dark:border-zinc-700 rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-[#98A77C]"
            />

            <button
              type="button"
              className="bg-[#728156] hover:bg-[#5F6E48] text-white px-7 py-4 rounded-xl font-semibold transition"
            >
              Subscribe
            </button>

          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400 mt-5">
            Be part of the change. One community at a time.
          </p>

        </div>
      </section>

      <Footer />

    </main>
  );
};

export default Home;




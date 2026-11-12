
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-[#E7F5DC] dark:bg-zinc-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">

        <div>
          <span className="inline-block bg-white dark:bg-zinc-800 text-[#728156] dark:text-[#B6C99B] px-5 py-2 rounded-full text-sm font-semibold mb-6">
            Together We Make A Difference
          </span>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-[#35452B] dark:text-white">
            Small Actions.
            <span className="block text-[#82965F] dark:text-[#B6C99B]">
              Big Changes.
            </span>
          </h1>

          <p className="text-gray-600 dark:text-gray-300 text-lg mt-6 leading-8 max-w-lg">
            Join hands with passionate people to build a better,
            greener and kinder community. Discover events,
            volunteer and make every action count.
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            <Link
              href="/upcomingEvents"
              className="bg-[#728156] hover:bg-[#5F6E48] text-white px-7 py-4 rounded-xl font-semibold transition"
            >
              Explore Events →
            </Link>

            <Link
              href="/CreateEvent"
              className="border border-[#728156] dark:border-[#B6C99B] text-[#52613C] dark:text-[#D1E2BB] hover:bg-white dark:hover:bg-zinc-800 px-7 py-4 rounded-xl font-semibold transition"
            >
              Create an Event
            </Link>
          </div>

          <div className="flex gap-8 mt-12">
            <div>
              <h3 className="text-3xl font-bold text-[#52613C] dark:text-[#B6C99B]">
                Together
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Stronger Communities
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-[#52613C] dark:text-[#B6C99B]">
                One Goal
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                A Better Tomorrow
              </p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 bg-[#B6C99B] dark:bg-zinc-800 rounded-[40px] rotate-3"></div>

          <img
            src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1000"
            alt="Community volunteers working together"
            className="relative w-full h-[350px] md:h-[500px] object-cover rounded-[32px] shadow-xl"
          />

          <div className="absolute -bottom-5 -left-3 md:-left-8 bg-white dark:bg-zinc-900 border border-transparent dark:border-zinc-700 rounded-2xl p-5 shadow-xl max-w-[230px]">
            <p className="text-[#728156] dark:text-[#B6C99B] font-bold text-lg">
              Be the change!
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Your time and kindness can change lives.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;

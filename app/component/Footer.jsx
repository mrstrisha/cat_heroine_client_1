
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#263321] dark:bg-black text-white transition-colors duration-300">

      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-16 pb-10">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2">
              <div className="w-11 h-11 bg-[#B6C99B] rounded-xl flex items-center justify-center text-2xl">
                🌱
              </div>

              <span className="text-2xl font-bold tracking-tight">
                Car <span className="text-[#B6C99B]">Heroine</span>
              </span>
            </Link>

            <p className="text-gray-300 leading-7 mt-6 max-w-xs">
              Bringing people together to create positive
              changes through community service, kindness
              and meaningful actions.
            </p>

            <div className="flex gap-3 mt-6">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#728156] flex items-center justify-center transition"
              >
                f
              </a>

              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#728156] flex items-center justify-center transition"
              >
                ◎
              </a>

              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#728156] flex items-center justify-center transition"
              >
                in
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-[#CFE1B9]">
              Quick Links
            </h3>

            <ul className="space-y-4 text-gray-300">
              <li><Link href="/" className="hover:text-[#B6C99B] transition">Home</Link></li>
              <li><Link href="/upcomingEvents" className="hover:text-[#B6C99B] transition">Upcoming Events</Link></li>
              <li><Link href="/CreateEvent" className="hover:text-[#B6C99B] transition">Create Event</Link></li>
              <li><Link href="/manageEvent" className="hover:text-[#B6C99B] transition">Manage Events</Link></li>
              <li><Link href="/joinedEvents" className="hover:text-[#B6C99B] transition">Joined Events</Link></li>
            </ul>
          </div>

          {/* Our Mission */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-[#CFE1B9]">
              Our Mission
            </h3>

            <ul className="space-y-4 text-gray-300">
              <li>🌱 Environmental Care</li>
              <li>🤝 Community Support</li>
              <li>❤️ Social Development</li>
              <li>🌍 Sustainable Future</li>
              <li>🙌 Volunteer Together</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-[#CFE1B9]">
              Get In Touch
            </h3>

            <div className="space-y-5 text-gray-300">

              <div className="flex gap-3">
                <span>📍</span>
                <p>Bangladesh</p>
              </div>

              <div className="flex gap-3">
                <span>✉️</span>
                <a
                  href="mailto:hello@carheroine.com"
                  className="hover:text-[#B6C99B]"
                >
                  hello@carheroine.com
                </a>
              </div>

              <p className="text-sm leading-6 text-gray-400">
                Have an idea or want to organize a community
                event? We would love to hear from you.
              </p>

              <Link
                href="/upcomingEvents"
                className="inline-block bg-[#728156] hover:bg-[#88976C] px-5 py-3 rounded-xl text-white font-semibold transition"
              >
                Explore Events →
              </Link>

            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-white/15 mt-14 pt-7 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-sm text-gray-400 text-center">
            © {new Date().getFullYear()} Car Heroine. All rights reserved.
          </p>

          <p className="text-sm text-gray-400">
            Made with ❤️ for a better community.
          </p>

        </div>

      </div>
    </footer>
  );
};

export default Footer;


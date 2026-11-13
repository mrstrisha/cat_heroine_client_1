
"use client";

import { toast } from "react-toastify";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
  Calendar,
  MapPin,
  Image as ImageIcon,
  AlignLeft,
  Tag,
} from "lucide-react";

// Theme palette
const theme = {
  light: "#E7F5DC",
  soft: "#CFE1B9",
  mid: "#B6C99B",
  accent: "#98A77C",
  dark: "#88976C",
  darkest: "#728156",
};

const EVENT_TYPES = [
  "Cleanup",
  "Plantation",
  "Donation",
  "Recycling",
  "Awareness",
  "Other",
];

export default function CreateEventPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const today = new Date();

  const minDate = `${today.getFullYear()}-${String(
    today.getMonth() + 1
  ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // Future date validation
    const selectedDate = data.eventDate;

    if (selectedDate <= minDate) {
      toast.error("Please select a future date!");
      return;
    }

    data.createdAt = new Date().toISOString();

    try {
      setLoading(true);

      // Get JWT Token
      const tokenResponse = await authClient.token();
      const token = tokenResponse.data?.token;

      if (tokenResponse.error || !token) {
        toast.error("Please login first!");
        return;
      }

      // Send request with JWT Token
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/CreateEvents`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to create event");
      }

      toast.success("Event created successfully!");

      e.target.reset();

      // Redirect to Upcoming Events
      setTimeout(() => {
        router.push("/upcomingEvents");
      }, 1500);

    } catch (err) {
      console.error(err);
      toast.error(err.message || "Event creation failed!");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F9F4] dark:bg-zinc-950 px-4 py-10 transition-colors duration-300">

      {/* Main Card */}
      <div className="w-full max-w-2xl rounded-3xl shadow-2xl p-8 md:p-10 border border-[#B6C99B] dark:border-zinc-800 bg-white/90 dark:bg-zinc-900 transition-colors duration-300">

        {/* Header */}
        <div className="text-center mb-8">
          <span className="inline-block rounded-full px-4 py-2 text-xs font-semibold mb-4 bg-[#E7F5DC] dark:bg-zinc-800 text-[#728156] dark:text-[#B6C99B]">
            🌿 MAKE A DIFFERENCE
          </span>

          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-[#728156] dark:text-white">
            Create an Event
          </h1>

          <p className="text-sm md:text-base text-[#88976C] dark:text-gray-400">
            Fill in the details below and inspire your community 🌱
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Title */}
          <Field label="Event Title" icon={<Tag size={18} />}>
            <input
              type="text"
              name="title"
              placeholder="e.g. Beach Cleanup Drive"
              required
              className="input-style"
            />
          </Field>

          {/* Description */}
          <Field
            label="Description"
            icon={<AlignLeft size={18} />}
          >
            <textarea
              name="description"
              rows={4}
              placeholder="Tell us what this event is about..."
              required
              className="input-style resize-none"
            />
          </Field>

          {/* Event Type */}
          <Field label="Event Type" icon={<Tag size={18} />}>
            <select
              name="eventType"
              required
              defaultValue=""
              className="input-style"
            >
              <option value="" disabled>
                Select a type
              </option>

              {EVENT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </Field>

          {/* Thumbnail */}
          <Field
            label="Thumbnail Image URL"
            icon={<ImageIcon size={18} />}
          >
            <input
              type="url"
              name="thumbnail"
              placeholder="https://example.com/image.jpg"
              required
              className="input-style"
            />
          </Field>

          {/* Location */}
          <Field
            label="Location"
            icon={<MapPin size={18} />}
          >
            <input
              type="text"
              name="location"
              placeholder="e.g. Cox's Bazar Sea Beach"
              required
              className="input-style"
            />
          </Field>

          {/* Date */}
          <Field
            label="Event Date"
            icon={<Calendar size={18} />}
          >
            <input
              type="date"
              name="eventDate"
              min={minDate}
              required
              className="input-style"
            />
          </Field>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed shadow-lg bg-gradient-to-r from-[#98A77C] to-[#728156] dark:from-[#728156] dark:to-[#4B5D38]"
          >
            {loading ? "Creating Event..." : "Create Event →"}
          </button>

        </form>

        <p className="text-center text-xs mt-6 text-[#88976C] dark:text-gray-400">
          Small actions, big impact. 🌱
        </p>
      </div>

      {/* Input Styles */}
      <style jsx global>{`
        .input-style {
          width: 100%;
          padding: 0.85rem 1rem;
          border-radius: 0.75rem;
          border: 1px solid ${theme.mid};
          background-color: white;
          color: #2c3324;
          font-size: 0.95rem;
          outline: none;
          transition: all 0.25s ease;
        }

        .dark .input-style {
          background-color: #18181b;
          color: #f9fafb;
          border-color: #3f3f46;
        }

        .input-style:focus {
          border-color: ${theme.darkest};
          box-shadow: 0 0 0 3px ${theme.soft};
        }

        .dark .input-style:focus {
          border-color: #98A77C;
          box-shadow: 0 0 0 3px rgba(152, 167, 124, 0.15);
        }

        .input-style::placeholder {
          color: #a0aa91;
        }

        .dark .input-style::placeholder {
          color: #9ca3af;
        }

        .input-style option {
          background-color: white;
          color: #2c3324;
        }

        .dark .input-style option {
          background-color: #18181b;
          color: #f9fafb;
        }

        .dark .input-style::-webkit-calendar-picker-indicator {
          filter: invert(1);
        }
      `}</style>
    </div>
  );
}

// Reusable Field Component
function Field({ label, icon, children }) {
  return (
    <div>
      <label className="flex items-center gap-2 mb-2 text-sm font-semibold text-[#728156] dark:text-[#B6C99B]">
        <span className="text-[#98A77C] dark:text-[#B6C99B]">
          {icon}
        </span>
        {label}
      </label>

      {children}
    </div>
  );
}


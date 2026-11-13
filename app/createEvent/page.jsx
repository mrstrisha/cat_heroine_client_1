
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
  Moon,
  Sun,
} from "lucide-react";

// Light Theme
const lightTheme = {
  light: "#E7F5DC",
  soft: "#CFE1B9",
  mid: "#B6C99B",
  accent: "#98A77C",
  dark: "#88976C",
  darkest: "#728156",
  background: "linear-gradient(135deg, #E7F5DC 0%, #CFE1B9 45%, #B6C99B 100%)",
  card: "rgba(255,255,255,0.88)",
  text: "#728156",
  input: "#ffffff",
  inputText: "#2c3324",
};

// Dark Theme
const darkTheme = {
  light: "#111827",
  soft: "#1F2937",
  mid: "#374151",
  accent: "#A3B18A",
  dark: "#A3B18A",
  darkest: "#D9E5C8",
  background: "linear-gradient(135deg, #111827 0%, #17212F 50%, #26352C 100%)",
  card: "rgba(31,41,55,0.95)",
  text: "#E5E7EB",
  input: "#111827",
  inputText: "#F9FAFB",
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
  const [isDark, setIsDark] = useState(false);

  const theme = isDark ? darkTheme : lightTheme;

  const today = new Date();

  const minDate = `${today.getFullYear()}-${String(
    today.getMonth() + 1
  ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  // Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // Future Date Validation
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

      // Send Request
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
    <div
      className="min-h-screen flex items-center justify-center px-4 py-10 transition-colors duration-500"
      style={{
        background: theme.background,
      }}
    >
      {/* Main Card */}
      <div
        className="w-full max-w-2xl rounded-3xl shadow-2xl p-6 md:p-10 border transition-all duration-500"
        style={{
          backgroundColor: theme.card,
          backdropFilter: "blur(10px)",
          borderColor: theme.mid,
        }}
      >
        {/* Dark Mode Toggle */}
        <div className="flex justify-end mb-5">
          <button
            type="button"
            onClick={() => setIsDark(!isDark)}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: theme.soft,
              color: theme.darkest,
              border: `1px solid ${theme.mid}`,
            }}
          >
            {isDark ? <Sun size={17} /> : <Moon size={17} />}
            {isDark ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <span
            className="inline-block rounded-full px-4 py-2 text-xs font-semibold mb-4"
            style={{
              backgroundColor: theme.soft,
              color: theme.darkest,
            }}
          >
            🌿 MAKE A DIFFERENCE
          </span>

          <h1
            className="text-3xl md:text-4xl font-bold mb-3"
            style={{ color: theme.darkest }}
          >
            Create an Event
          </h1>

          <p
            className="text-sm md:text-base"
            style={{ color: theme.accent }}
          >
            Fill in the details below and inspire your community 🌱
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Title */}
          <Field label="Event Title" icon={<Tag size={18} />} theme={theme}>
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
            theme={theme}
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
          <Field label="Event Type" icon={<Tag size={18} />} theme={theme}>
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
            theme={theme}
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
            theme={theme}
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
            theme={theme}
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
            className="w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${theme.accent}, ${theme.darkest})`,
            }}
          >
            {loading ? "Creating Event..." : "Create Event →"}
          </button>
        </form>

        <p
          className="text-center text-xs mt-6"
          style={{ color: theme.accent }}
        >
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
          background-color: ${theme.input};
          color: ${theme.inputText};
          font-size: 0.95rem;
          outline: none;
          transition: all 0.25s ease;
        }

        .input-style:focus {
          border-color: ${theme.accent};
          box-shadow: 0 0 0 3px ${theme.mid};
        }

        .input-style::placeholder {
          color: ${isDark ? "#9CA3AF" : "#a0aa91"};
        }

        .input-style option {
          background-color: ${theme.input};
          color: ${theme.inputText};
        }

        .input-style::-webkit-calendar-picker-indicator {
          filter: ${isDark ? "invert(1)" : "none"};
        }
      `}</style>
    </div>
  );
}

// Reusable Field Component
function Field({ label, icon, children, theme }) {
  return (
    <div>
      <label
        className="flex items-center gap-2 mb-2 text-sm font-semibold"
        style={{ color: theme.darkest }}
      >
        <span style={{ color: theme.accent }}>
          {icon}
        </span>

        {label}
      </label>

      {children}
    </div>
  );
}

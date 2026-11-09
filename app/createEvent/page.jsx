
"use client";

import { toast } from "react-toastify";
import { useState } from "react";
import { useRouter } from "next/navigation";
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
  // const [userEmail, setUserEmail] = useState("");


  // useState(() => {
  //   if (typeof window !== "undefined") {
  //     setUserEmail(
  //       localStorage.getItem("userEmail") || ""
  //     );
  //   }
  // });


  const today = new Date();

  const minDate = `${today.getFullYear()}-${String(
    today.getMonth() + 1
  ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    // if (!userEmail) {
    //   toast.error("Please login first!");
    //   return;
    // }

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // Future date validation
    const selectedDate = data.eventDate;

    if (selectedDate <= minDate) {
      toast.error("Please select a future date!");
      return;
    }

    // Add creator information
    // data.creatorEmail = userEmail;
    data.createdAt = new Date().toISOString();

    try {
      setLoading(true);

      const res = await fetch(
        "http://localhost:8000/CreateEvents",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to create event");
      }

      toast.success("Event created successfully!");

      e.target.reset();

      // Redirect to Upcoming Events
      setTimeout(() => {
        router.push("/upcomingEvents");
      }, 1500);

    } catch (err) {
      console.error(err);
      toast.error("Event creation failed!");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-10"
      style={{
        background: `linear-gradient(135deg, ${theme.light} 0%, ${theme.soft} 45%, ${theme.mid} 100%)`,
      }}
    >
      {/* Main Card */}
      <div
        className="w-full max-w-2xl rounded-3xl shadow-2xl p-8 md:p-10 border"
        style={{
          backgroundColor: "rgba(255,255,255,0.88)",
          backdropFilter: "blur(10px)",
          borderColor: theme.mid,
        }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <span
            className="inline-block rounded-full px-4 py-2 text-xs font-semibold mb-4"
            style={{
              backgroundColor: theme.light,
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

          {/* Creator Email */}
          {/* <div
            className="rounded-xl px-4 py-3 text-sm"
            style={{
              backgroundColor: theme.light,
              color: theme.darkest,
            }}
          >
            <span className="font-semibold">
              Creating as:
            </span>{" "}
            {userEmail || "Please login first"}
          </div> */}

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
          background-color: #ffffff;
          color: #2c3324;
          font-size: 0.95rem;
          outline: none;
          transition: all 0.25s ease;
        }

        .input-style:focus {
          border-color: ${theme.darkest};
          box-shadow: 0 0 0 3px ${theme.soft};
        }

        .input-style::placeholder {
          color: #a0aa91;
        }
      `}</style>
    </div>
  );
}

// Reusable Field Component
function Field({ label, icon, children }) {
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


"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

const EditPage = ({ event }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!event?._id) {
      alert("Event ID not found!");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:8000/eventDetail/${event._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!res.ok) {
        throw new Error("Event update failed!");
      }

      const result = await res.json();

      console.log("Updated Event:", result);

      alert("Event updated successfully!");

      setOpen(false);
      router.refresh();

    } catch (error) {
      console.error("Update Error:", error);
      alert(error.message || "Something went wrong!");

    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>

      {/* Open Dialog Button */}
      <DialogTrigger asChild>
        <Button className="rounded-md bg-[#728156] hover:bg-[#5f6e47] text-white">
          Edit Event
        </Button>
      </DialogTrigger>

      {/* Dialog Content */}
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">

        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Edit Event
          </DialogTitle>
        </DialogHeader>

        {/* Edit Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Event Title */}
          <div>
            <label className="block mb-2 font-medium">
              Event Title
            </label>

            <input
              type="text"
              name="title"
              defaultValue={event?.title || ""}
              required
              className="w-full border rounded-lg p-3"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 font-medium">
              Description
            </label>

            <textarea
              name="description"
              defaultValue={event?.description || ""}
              rows={4}
              required
              className="w-full border rounded-lg p-3"
            />
          </div>

          {/* Event Type and Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div>
              <label className="block mb-2 font-medium">
                Event Type
              </label>

              <input
                type="text"
                name="eventType"
                defaultValue={event?.eventType || ""}
                required
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Location
              </label>

              <input
                type="text"
                name="location"
                defaultValue={event?.location || ""}
                required
                className="w-full border rounded-lg p-3"
              />
            </div>

          </div>

          {/* Thumbnail */}
          <div>
            <label className="block mb-2 font-medium">
              Thumbnail URL
            </label>

            <input
              type="url"
              name="thumbnail"
              defaultValue={event?.thumbnail || ""}
              className="w-full border rounded-lg p-3"
            />
          </div>

          {/* Event Date */}
          <div>
            <label className="block mb-2 font-medium">
              Event Date
            </label>

            <input
              type="date"
              name="eventDate"
              defaultValue={
                event?.eventDate
                  ? new Date(event.eventDate)
                      .toISOString()
                      .split("T")[0]
                  : ""
              }
              required
              className="w-full border rounded-lg p-3"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-3">

            <Button
              type="button"
              variant="outline"
              disabled={loading}
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={loading}
              className="bg-[#728156] hover:bg-[#5f6e47] text-white"
            >
              {loading ? "Updating..." : "Save Changes"}
            </Button>

          </div>

        </form>

      </DialogContent>
    </Dialog>
  );
};

export default EditPage;


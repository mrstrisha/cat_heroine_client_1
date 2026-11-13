
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

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

      // Get JWT token
      const tokenResponse = await authClient.token();
      const token = tokenResponse.data?.token;

      if (tokenResponse.error || !token) {
        alert("Please login first!");
        return;
      }

      const res = await fetch(
         `${process.env.NEXT_PUBLIC_API_URL}/eventDetail/${event._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Event update failed!");
      }

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
      <DialogTrigger asChild>
        <Button className="rounded-md bg-[#728156] hover:bg-[#5f6e47] text-white">
          Edit Event
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Edit Event
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
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

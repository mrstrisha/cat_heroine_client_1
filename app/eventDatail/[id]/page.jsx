
import Image from "next/image";

import EditPage from "@/app/component/EditPage";
import DeletePage from "@/app/component/DeletePage";

const EventDetailPage = async ({ params }) => {
  const { id } = await params;

  let data;

  try {
    const res = await fetch(
      `http://localhost:8000/eventDetail/${id}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch event details");
    }

    data = await res.json();

  } catch (error) {
    console.error("Event Fetch Error:", error);

    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-bold text-red-500">
          Failed to load event details!
        </h2>
      </div>
    );
  }

  if (!data || !data._id) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-700">
          Event Not Found!
        </h2>
      </div>
    );
  }

  const formattedDate = data.eventDate
    ? new Date(data.eventDate).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Date not available";

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Main Content */}
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden">

          {/* Event Image */}
          <div className="relative h-[280px] md:h-[450px]">

            <Image
              src={data.thumbnail}
              alt={data.title || "Event Image"}
              className="w-full h-full object-cover"
              width={1200}
              height={600}
              priority
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

            <div className="absolute bottom-8 left-6 md:left-10">

              <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                {data.eventType}
              </span>

              <h1 className="text-3xl md:text-5xl font-bold text-white mt-4">
                {data.title}
              </h1>

            </div>
          </div>

          {/* Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 p-6 md:p-10">

            {/* Description */}
            <div className="lg:col-span-2">

              <h2 className="text-2xl font-bold text-gray-800 mb-5">
                About This Event
              </h2>

              <p className="text-gray-600 leading-8 text-base md:text-lg">
                {data.description}
              </p>

              {/* Event Information */}
              <div className="mt-10 border-t border-gray-100 pt-8">

                <h2 className="text-xl font-bold text-gray-800 mb-5">
                  Event Information
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                  {/* Date */}
                  <div className="bg-blue-50 p-5 rounded-2xl">
                    <p className="text-gray-500 text-sm mb-2">
                      📅 Event Date
                    </p>

                    <h3 className="font-semibold text-gray-800">
                      {formattedDate}
                    </h3>
                  </div>

                  {/* Location */}
                  <div className="bg-purple-50 p-5 rounded-2xl">
                    <p className="text-gray-500 text-sm mb-2">
                      📍 Location
                    </p>

                    <h3 className="font-semibold text-gray-800">
                      {data.location}
                    </h3>
                  </div>

                  {/* Category */}
                  <div className="bg-orange-50 p-5 rounded-2xl">
                    <p className="text-gray-500 text-sm mb-2">
                      🏷️ Category
                    </p>

                    <h3 className="font-semibold text-gray-800">
                      {data.eventType}
                    </h3>
                  </div>

                </div>
              </div>

            </div>

            {/* Sidebar */}
            <div>

              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 sticky top-8">

                <h2 className="text-xl font-bold text-gray-800 mb-6">
                  Event Overview
                </h2>

                <div className="space-y-5">

                  {/* Event Name */}
                  <div>
                    <p className="text-sm text-gray-500 mb-1">
                      Event Name
                    </p>

                    <p className="font-semibold text-gray-800">
                      {data.title}
                    </p>
                  </div>

                  {/* Date */}
                  <div>
                    <p className="text-sm text-gray-500 mb-1">
                      Date
                    </p>

                    <p className="font-semibold text-gray-800">
                      {formattedDate}
                    </p>
                  </div>

                  {/* Location */}
                  <div>
                    <p className="text-sm text-gray-500 mb-1">
                      Location
                    </p>

                    <p className="font-semibold text-gray-800">
                      {data.location}
                    </p>
                  </div>

                  {/* Category */}
                  <div>
                    <p className="text-sm text-gray-500 mb-1">
                      Category
                    </p>

                    <p className="font-semibold text-blue-600">
                      {data.eventType}
                    </p>
                  </div>

                </div>

                {/* Edit and Delete Buttons */}
                <div className="flex flex-wrap gap-3 mt-8">

                  <EditPage event={data} />
                    <DeletePage id={id}></DeletePage>
                 

                </div>

              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default EventDetailPage;

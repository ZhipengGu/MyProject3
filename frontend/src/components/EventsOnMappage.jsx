// This component is a preview for the event, which includes event images & title. 
// It will be used on the MapPage 
import React from 'react';
import { Link } from "react-router-dom";

export default function EventsOnMappage({ events }) {
  return (
    <div>
      <div className="flex ml-10 gap-3 mt-2.5 overflow-hidden rounded-2xl  ">
        {events.slice(0, 6).map((event) => (
          <Link
            to={`/event/${event._id}`}
            key={event._id}
            className="relative flex justify-center items-center flex-shrink-0 drop-shadow-lg cursor-pointer transform transition-transform hover:scale-105 hover:saturate-200"
          >
            <img
              // event.imageUrl ||
              src={"https://picsum.photos/seed/picsum/300/200"}
              className="rounded-2xl object-cover aspect-[2.56] w-[240px] max-sm:w-[200px]"
              alt="Event"
            />
            <div className="eventtitle-with-bg w-[240px] max-sm:w-[200px] rounded-b-2xl hover:bg-opacity-75 transition-bg-opacity duration-300">
              <h1 className="text-xl font-bold text-gray-700 hover:text-black">
                {event.title}
              </h1>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
// This component is a preview for the event, which consists of event image, time, title, address.
// It will be used on homepage & search pages
import React from "react";
import { MdLocationPin } from "react-icons/md";
import { Link } from "react-router-dom";

export default function EventInfoPreview({ event }) {

  const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL ?? "";
  return (
    <Link
      to={`/event/${event._id}`}
      className="group flex gap-5 mt-4 tracking-tight leading-[100%] max-w-[600px]"
    >

      <img
        src={
          event.imageUrl
            ? `${IMAGE_BASE_URL}/image/${event.imageUrl}`
            : "../images/default-event-image.jpg"
        }
        alt={event.title}
        className=" aspect-square object-cover w-[140px] max-lg:w-[120px] rounded-xl group-hover:scale-105 duration-300 shadow-2xl shadow-gray-300"
      />

      <div
        // onMouseEnter={() => console.log(1111)}
        // onMouseLeave={() => console.log(2222)}
        className="flex flex-col my-auto gap-3 text-xl max-lg:text-base max-lg:font-medium group-hover:scale-[101%] duration-300"
      >
        <div className="text-sky-400">
          {new Date(event.startTime).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
        <div className="font-bold">{event.title}</div>
        <div className="flex text-yellow-500">
          <MdLocationPin className="translate-y-1" />
          <div> {event.address.detailed_address}</div>
        </div>
      </div>
    </Link>
  );
}

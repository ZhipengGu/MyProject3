// This component is a preview for the event, which includes event images.
// It will be used on the homepage
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";

export default function TrendingEvents({ events }) {
  const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL ?? "";
  // const filterUpcomingAndOngoingEvents = (events) => {
  //   const now = new Date();
  //   const next24Hours = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  //
  //   return events.filter((event) => {
  //     const startTime = new Date(event.startTime);
  //     const endTime = new Date(event.endTime);
  //     return (
  //       (startTime >= now && startTime <= next24Hours) ||
  //       (startTime <= now && endTime >= now)
  //     );
  //   });
  // };
  // const trendingEvents = filterUpcomingAndOngoingEvents(events);
  const controls = useAnimation();
  useEffect(() => {
    controls.start({
      x: ["0%", "-100%"],
      transition: {
        ease: "linear",
        duration: 10,
        repeat: Infinity,
      },
    });
  }, [controls]);
  const handleHoverStart = () => {
    controls.stop();
  };

  const handleHoverEnd = () => {
    controls.start();
  };
  const trendingEvents = events.slice(0, 7);
  const duplicatedEvents = [...trendingEvents, ...trendingEvents];
  console.log(events);

  return (
    <div>
      <h1 className=" text-[45px] font-bold mb-5 text-white max-lg:text-3xl">
        Trending Events
      </h1>

      <div className="flex overflow-hidden ">
        <motion.div
          className="flex "
          animate={controls}
          // onMouseEnter={handleHoverStart}
          // onHoverEnd={handleHoverEnd}
          whileHover={handleHoverStart}
        >
          {/* !!! Show images of maximum 7 events here */}
          {duplicatedEvents.map((event, index) => (
            <div
              key={index}
              className="flex-shrink-0 p-2 min-w-20 duration-300 hover:-skew-y-3 "
              style={{ width: `${100 / trendingEvents.length}%` }}
            >
              <Link to={`/event/${event._id}`}>
                <img
                  src={
                    event.imageUrl
                      ? `${IMAGE_BASE_URL}/image/${event.imageUrl}`
                      : "../images/default-event-image.jpg"
                  }
                  className="object-cover  aspect-[3/2] rounded-2xl shadow-2xl shadow-gray-300"
                  alt={event.title}
                />
              </Link>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

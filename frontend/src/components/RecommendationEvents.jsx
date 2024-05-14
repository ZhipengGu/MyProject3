import React, { useContext, useEffect, useState } from "react";

import EventInfoPreview from "./EventInfoPreview";

export default function Recommendations({ events }) {
  // const [filteredEvents, setFilteredEvents] = useState([]);

  // useEffect(() => {
  //   let relevantEvents = [];
  //
  //   if (user) {
  //     const userTags = new Set(user.tags);
  //     relevantEvents = events.filter((event) =>
  //       event.tags.some((tag) => userTags.has(tag))
  //     );
  //   } else {
  //     // relevantEvents = events.filter((event) =>
  //     //   event.tags.includes("Community")
  //     // );
  //     relevantEvents = events;
  //   }
  //
  //   setFilteredEvents(relevantEvents);
  // }, [user, events]);

    const filteredEvents = events;

  return (
    <div>
      {filteredEvents.slice(0, 5).map((event, index) => (
        <EventInfoPreview key={index} event={event} />
      ))}
    </div>
  );
}

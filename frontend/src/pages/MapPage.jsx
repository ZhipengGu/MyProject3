import React, { useContext, useState } from "react";
import EventMap from "../components/EventMap";
import EventCategories from "../components/EventCategories";
import EventsOnMappage from "../components/EventsOnMappage";
import { AppContext } from "../context/AppContextProvider";
import useGet from "../utils/useGet";

const categories = [
  "Arts & Culture",
  "Sports & Recreation",
  "Music & Concerts",
  "Food & Drink",
  "Health & Wellness",
  "Business & Networking",
  "Family & Education",
  "Technology & Innovation",
  "Fashion & Beauty",
  "Charity & Fundraising",
  "Community",
];

export default function MapPage() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";
  const { data: events } = useGet(`${API_BASE_URL}/api/events`);

  const [selectedCategory, setSelectedCategory] = useState("");

  // Function to handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  // Filter events based on selected category if a category is selected
  const filteredEvents = selectedCategory
    ? events.filter(
        (event) => event.tags && event.tags.includes(selectedCategory)
      )
    : events;

  // If user didn't select an event or selected categories with no events,then show the default events
  const displayEvents =
    filteredEvents.length > 0 || !selectedCategory ? filteredEvents : events;

  return (
    <div className="relative">
      <div className="z-40 absolute top-20 pl-44 max-sm:top-32">
        <EventCategories
          categories={categories}
          onCategorySelect={handleCategorySelect}
        />
      </div>
      <div className="z-40 absolute top-32 max-sm:top-44">
        <EventsOnMappage events={displayEvents} />
      </div>
      <EventMap events={filteredEvents} />
    </div>
  );
}

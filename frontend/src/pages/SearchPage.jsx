import { AiOutlineCaretRight } from "react-icons/ai";
import { AiOutlineCaretLeft } from "react-icons/ai";
import React, { useContext, useState } from "react";
import EventInfoPreview from "../components/EventInfoPreview";
import useGet from "../utils/useGet";

export default function SearchPage() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";
  const [searchTermInput, setSearchTermInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [searchEvents, setSearchEvents] = useState({});

  // Fetching both general event list and search results
  const {
    data: events,
    isLoading: eventsLoading,
    error: eventsError,
  } = useGet(`${API_BASE_URL}/api/events`);


  // Reset current state
  const handleSearch = async (page = currentPage) => {
    const res = await fetch(
      `${API_BASE_URL}/api/events/search?title=${encodeURIComponent(
        searchTermInput
      )}&page=${currentPage}`
    );
    const data = await res.json();
    setSearchEvents(data);
    setCurrentPage(page);
  };

  const handleRightArrowClick = () => {
   const nextPage = currentPage + 1;
   handleSearch(nextPage);
  };

  const handleLeftArrowClick = () => {
     const prevPage = currentPage - 1;
     if (prevPage >= 0) {
       handleSearch(prevPage);
     }
  };

  const isWithinNextWeek = (date) => {
    const today = new Date();
    const nextWeek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 7
    );
    const eventDate = new Date(date);
    return eventDate >= today && eventDate <= nextWeek;
  };

  const upcomingEvents = events.filter((event) =>
    isWithinNextWeek(event.startTime)
  );

  return (
    <div className="flex flex-col ">
      <div className=" h-64 w-full object-cover rounded-b-[50px] max-sm:h-40 gradient-bg"></div>

      <div className="px-24 max-lg:px-6 mt-5 space-x-4 ">
        <input
          type="text"
          placeholder="Enter your keyword here..."
          value={searchTermInput}
          onChange={(e) => setSearchTermInput(e.target.value)}
          className="h-14 w-2/3 text-2xl max-sm:text-base border border-transparent border-b-stone-400 focus:outline-slate-300"
        />
        <button onClick={() => handleSearch(0)} className="search-btn">
          SEARCH
        </button>
      </div>

      {/*if search results exist & number of event > 6, show search results & two buttons to turn page, 
      will need to add onclick events to add/minus the page numbers*/}
      {/*if number of event < 6, no need to show left & right buttons*/}
      <div className="relative px-24 max-lg:px-6">
        <h1 className="section-name">Search Result</h1>

        {searchEvents.length > 0 ? (
          <>
            {currentPage > 0 && (
              <button
                onClick={handleLeftArrowClick}
                className="turn-left-arrow"
              >
                <AiOutlineCaretLeft className="text-2xl max-lg:text-xl" />{" "}
              </button>
            )}

            <div className="flex gap-10 flex-wrap max-sm:flex-col">
              {searchEvents
                .slice(currentPage * 6, (currentPage + 1) * 6)
                .map((event, index) => (
                  <EventInfoPreview key={index} event={event} />
                ))}
            </div>

            {currentPage * 6 < searchEvents.length - 6 && (
                <button
                  onClick={handleRightArrowClick}
                  className="turn-right-arrow"
                >
                  <AiOutlineCaretRight className="text-2xl  max-lg:text-xl" />
                </button>
              )}
          </>
        ) : (
          <p className=" text-2xl text-sky-400">Opps! No results found.</p>
        )}
      </div>

      {/*else, show 5 upcoming events*/}
      <div className="px-24 max-sm:px-6">
        <h1 className="section-name  ">Upcoming Activities</h1>
        <div className="flex gap-10 flex-wrap max-sm:flex-col">
          {upcomingEvents.slice(0, 5).map((event, index) => (
            <EventInfoPreview key={index} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
}

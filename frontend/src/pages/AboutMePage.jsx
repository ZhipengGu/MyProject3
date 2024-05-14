import React from "react";
import MyEvents from "../components/MyEvents";
import { CgMediaLive } from "react-icons/cg";
import { AppContext } from "../context/AppContextProvider";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { FiLogOut } from "react-icons/fi";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";
import EventInfoPreview from "../components/EventInfoPreview";

export default function AboutMePage() {
  const { user, setUser } = useContext(AppContext);
  const [myEvents, setMyEvents] = useState([]);
  const [likeEvents, setLikeEvents] = useState([]);
  const [attendedEvents, setAttendedEvents] = useState([]);
  function handleLogout() {
    axios
      .post(`${API_BASE_URL}/api/auth/logout`, {}, { withCredentials: true })
      .then((res) => {
        setUser(null);
      });
  }
  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const myEventsResponse = await axios.get(
          `${API_BASE_URL}/api/events/me`,
          { withCredentials: true }
        );
        setMyEvents(myEventsResponse.data);

        const attendedEventsResponse = await axios.get(
          `${API_BASE_URL}/api/attends/user`,
          { withCredentials: true }
        );
        const attendedEventsIds = attendedEventsResponse.data;
        console.log(attendedEventsResponse.data);
        const attendedEventResults = [];
        for (const eventId of attendedEventsIds) {
          const eventResponse = await axios.get(
            `${API_BASE_URL}/api/events/${eventId}`,
            { withCredentials: true }
          );
          attendedEventResults.push(eventResponse.data);
          console.log(eventResponse.data);
        }
        setAttendedEvents(attendedEventResults);

        const likeEventsIdResponse = await axios.get(
          `${API_BASE_URL}/api/likes/user`,
          { withCredentials: true }
        );
        // setLikeEventsId(likeEventsIdResponse.data);

        const likedEventIds = likeEventsIdResponse.data;
        // Initialize an array to store the event data
        const likeEventResults = [];

        // Loop through each event ID sequentially
        for (const eventId of likedEventIds) {
          const eventResponse = await axios.get(
            `${API_BASE_URL}/api/events/${eventId}`,
            { withCredentials: true }
          );
          likeEventResults.push(eventResponse.data);
        }
        // After all requests are done, set the state
        setLikeEvents(likeEventResults);
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };
    fetchEventData();
  }, []);

  return (
    <div className="flex flex-col ">
      <div className="relative ">
        {/* <img
                    src="images/user-login-signup-bg.jpg"
                    className=" opacity-80 h-96 w-full object-cover max-sm:h-60 rounded-b-[50px] "
                /> */}

        <div className=" h-96 w-full object-cover rounded-b-[50px] max-sm:h-56 gradient-bg"></div>

        <div
          onClick={handleLogout}
          className="absolute right-0 top-0 md:p-5 bg-white bg-opacity-40 shadow-lg text-white font-bold text-2xl rounded-bl-[50px] flex-col flex-center max-sm:text-lg max-sm:p-2  hover:text-sky-300 cursor-pointer"
        >
          <FiLogOut className="text-2xl" /> <span>Logout</span>
        </div>
        <div className="flex justify-center ">
          <div className="flex-col absolute top-[100px] max-sm:top-[70px] bg-white bg-opacity-50 rounded-3xl h-[300px] w-2/3 max-sm:h-[180px] flex justify-center items-center">
            {/* avatar & username, will need to modify later */}
            <img
              src={`${user.avatarPath}`}
              className="rounded-full object-cover w-32 aspect-square max-sm:w-20"
            />
            <h1 className="text-2xl mt-3 font-medium">{user.displayName}</h1>
          </div>
        </div>

        {/* Live button, will need to modify later */}
        <button
          className="absolute text-4xl top-[265px] left-1/2 translate-x-7 max-sm:top-[150px]"
          onClick={() => {
            // TODO: need to add an onclick event to enable notification if the user is in alive mode
          }}
        >
          <CgMediaLive className="animate-scale text-yellow-400" />
        </button>
      </div>

      <div className="px-20 mt-14 max-sm:mt-7 max-sm:px-6 ">
        {/* My Interested Events secton*/}
        <h1 className=" section-name ">My Interested Activities</h1>
        <div className="flex gap-5 flex-wrap max-sm:flex-col ">
          {
            /* TODO: add events display here*/
            likeEvents.map((event, index) => (
              <MyEvents key={index} event={event} />
            ))
          }
        </div>
        {/* My Attended Events secton */}
        <h1 className=" section-name ">My Attended Activities</h1>
        <div className="flex gap-5 flex-wrap max-sm:flex-col">
          {attendedEvents.map((event, index) => (
            <MyEvents key={index} event={event} />
          ))}
        </div>

        {/* My Post Events secton */}
        <h1 className=" section-name ">My Activity Listings</h1>
        <div className="flex gap-5 flex-wrap max-sm:flex-col mb-3">
          {
            /* TODO: add events display here*/
            myEvents.map((event, index) => (
              <MyEvents key={index} event={event} />
            ))
          }
        </div>
      </div>
    </div>
  );
}

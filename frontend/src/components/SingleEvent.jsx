// This component is a preview for a single event, which includes all information except the location of the event .
// It will be used on the SingleEventPage

import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { AppContext } from "../context/AppContextProvider";
import moment from "moment";
import useGet from "../utils/useGet";

export default function SingleEvent({ event }) {
  const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL ?? "";
  const { API_BASE_URL, user } = useContext(AppContext);
  const [likeCounts, setLikeCounts] = useState(0);
  // Determine if the user liked the event based on fetched likes
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();
  const [likeUsers, setLikeUsers] = useState([]);
  const [attendee, setAttendee] = useState([]);


  // Using `useGet` for fetching likes
  const {
    data: likes,
    error,
    isLoading,
    refetch,
  } = useGet(`${API_BASE_URL}/api/likes/event/${event._id}`);

  const {
    data: attendeeFromUseGet,
    error: attendeeError,
    isLoading: attendeeLoading,
    refetch: refetchAttendees,
  } = useGet(`${API_BASE_URL}/api/attends/event/${event._id}`);

  const [vacancies, setVacancies] = useState(
    event.vacancy - attendeeFromUseGet.length
  );

  useEffect(() => {
    if (likes) {
      setLiked(user && likes.includes(user._id));
      setLikeCounts(likes.length);
      const fetchLikeEventUsers = async () => {
        try {
          const filteredLikes = likes
            .filter((userId) => !attendee.includes(userId))
            .filter((userId) => userId !== user._id);

          const usersLiked = await Promise.all(
            filteredLikes.map(async (userId) => {
              const userResponse = await axios.get(
                `${API_BASE_URL}/api/users/${userId}`,
                { withCredentials: true }
              );

              return userResponse.data;
            })
          );
          setLikeUsers(usersLiked);
        } catch (error) {
          console.error("Error fetching Like event data:", error);
        }
      };
      fetchLikeEventUsers();
    }
  }, [likes, user, attendee]);

  useEffect(() => {
    if (attendeeFromUseGet) {
      setAttendee(attendeeFromUseGet);
      setVacancies(event.vacancy - attendeeFromUseGet.length);
    }
  }, [attendeeFromUseGet]);

  const handleLike = async () => {
    if (!user) {
      alert("Please log in to perform this action.");
      navigate("/login");
      return;
    }

    const method = liked ? "delete" : "post";
    const url = `${API_BASE_URL}/api/likes`;

    try {
      await axios({
        method: method,
        url: url,
        withCredentials: true,
        data: {
          eventId: event._id,
          userId: user._id,
        },
      });
      setLiked(!liked);
      // Adjust the like count manually
      setLikeCounts((prev) => (liked ? prev - 1 : prev + 1));
    } catch (error) {
      console.error("Failed to update like:", error);
    }
  };

  const handleConfirmAttendance = async () => {
    try {
      const selectedUserId = document.getElementById("likedUser").value;
      if (attendee.includes(selectedUserId) || !selectedUserId) {
        return;
      }

      await axios({
        method: "post",
        url: `${API_BASE_URL}/api/attends`,
        withCredentials: true,
        data: {
          eventId: event._id,
          userId: selectedUserId,
        },
      });
      setAttendee([...attendee, selectedUserId]);
      setVacancies((prev) => prev - 1);
    } catch (error) {
      console.error("Failed to create an attend:", error);
    }
  };

  const handleCancelEvent = async () => {
    const cancelConfirmed = confirm(
      "Are your sure to cancel this fantastic event?"
    );
    if (cancelConfirmed) {
      try {
        await axios({
          method: "delete",
          url: `${API_BASE_URL}/api/events/${event._id}`,
          withCredentials: true,
        });
        confirm("Event cancelled successfully!");
        navigate("/");
      } catch (error) {
        console.error("Failed to Delete event:", error);
      }
    } else {
      return;
    }
  };

  return (
    <div className="flex flex-col px-12 max-sm:px-5">
      <div className="flex flex-row max-lg:flex-col mt-10 max-sm:mt-0">
        <div className="">
          <img
            src={
              event.imageUrl
                ? `${IMAGE_BASE_URL}/image/${event.imageUrl}`
                : "../images/default-event-image.jpg"
            }
            className="w-[600px] object-cover aspect-video sm:rounded-[20px] max-sm:h-52 rounded-b-[30px] shadow-md shadow-gray-300"
            alt={event.title}
          />
        </div>

        <div className="ml-10 max-lg:ml-0">
          <div className="flex justify-between items-center">
            <h1 className="section-name">{event.title}</h1>
            <div className="flex items-center ">
              {likeUsers.map((user, index) => (
                <img
                  key={index}
                  className="w-10 h-10 -mr-4 rounded-full border-2 border-white shadow-md"
                  src={user.avatarPath}
                  alt="avatar"
                />
              ))}
            </div>
          </div>
          <div className="flex flex-row my-10 justify-around items-center gap-10 max-lg:gap-2">
            <div className=" text-center text-lg font-bold">
              Start Time
              <div className=" bg-sky-200 event-info-div text-center">
                {moment(event.startTime).format("MMM DD")}
                <br />
                {moment(event.startTime).format("hh:mm a")}
              </div>
            </div>

            <div className=" text-center text-lg font-bold">
              End Time
              <div className=" bg-sky-200 event-info-div text-center">
                {moment(event.endTime).format("MMM DD")}
                <br />
                {moment(event.endTime).format("hh:mm a")}
              </div>
            </div>

            <div className="text-center text-lg font-bold">
              Vacancies
              <div className="bg-yellow-100 event-info-div">
                <p>{vacancies <= 0 ? " None" : vacancies}</p>
              </div>
            </div>
            <div className=" text-center text-lg font-bold ">
              People
              <div className=" bg-yellow-100 event-info-div w-20">
                <p>{event.vacancy}</p>
              </div>
            </div>

            <div className=" text-center text-lg font-bold">
              Interested
              <div className=" bg-pink-100 event-info-div">
                <button onClick={handleLike}>
                  {liked ? (
                    <AiFillHeart className="text-2xl" />
                  ) : (
                    <AiOutlineHeart className="text-2xl" />
                  )}
                  {likeCounts}
                </button>
              </div>
            </div>
          </div>

          {/* TODO: comfirm attendance button */}
          <div className=" text-center text-lg font-bold ">
            {user && user._id === event.userId && (
              <>
                {likeUsers != 0 && (
                  <select
                    name="likedUser"
                    id="likedUser"
                    className="p-2 bg-orange-100 rounded-md "
                  >
                    {likeUsers.map((userLiked, index) => (
                      <option key={index} value={userLiked._id}>
                        {userLiked.username}
                      </option>
                    ))}
                  </select>)
                }
                {likeUsers != 0 ? <button
                  className="text-center bg-green-100 rounded-md p-2 ml-4"
                  onClick={handleConfirmAttendance}
                >
                  One more joined!
                </button>
                  : vacancies > 0 && (<span
                    className="text-center bg-green-100 rounded-md p-2 ml-4"
                  >
                    waiting for people interested
                  </span>)
                }

                <button
                  className="text-center bg-red-100 rounded-md p-2 ml-4"
                  onClick={handleCancelEvent}
                >
                  Cancel this event
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="relative mt-3">
        <img
          src={
            event.imageUrl
              ? `${IMAGE_BASE_URL}/image/${event.imageUrl}`
              : "../images/default-event-image.jpg"
          }
          className="opacity-60 object-cover w-full h-[300px]"
        />
        <div className="absolute inset-0 flex flex-col justify-center p-12 max-sm:p-6 overflow-hidden">
          <h1 className="section-name mt-0">Event Description</h1>
          <p className="text-lg ">{event.description}</p>
        </div>
      </div>
    </div>
  );
}

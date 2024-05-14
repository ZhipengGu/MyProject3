import { BsPeopleFill } from "react-icons/bs";
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { tags } from "../utils/tags";
import axios from "axios";

import React from "react";
import SmallMap from "../components/SmallMap";
import { AppContext } from "../context/AppContextProvider";

export default function AddPostPage() {
  const [imageUrl, setImageUrl] = useState("");
  const [previewSrc, setPreviewSrc] = useState(
    "/images/default-event-image.jpg"
  );
  const [selectedFile, setSelectedFile] = useState(previewSrc);
  const [error, setError] = useState(null);
  const { API_BASE_URL } = useContext(AppContext);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const { handleSubmit, register } = useForm();

  //this is for SmallMap component to show address
  const [address, setAddress] = useState(null);
  const [location, setLocation] = useState(null);
  const [validAddress, setValidAddress] = useState(false);

  //get user input & post to server
  const onSubmit = handleSubmit((data) => {
    const startTime = new Date(data.startTime);
    const endTime = new Date(data.endTime);
    const currentDateTime = new Date();

    if (startTime < currentDateTime) {
      setError("The start time cannot be earlier than the current time.");
      return;
    } else if (endTime < startTime) {
      setError("The end time cannot be earlier than the start time.");
      return;
    }

    data.address = {
      detailed_address: address,
      location: {
        coordinates: location,
      },
    };
    data.imageUrl = imageUrl;

    axios
      .post(`${API_BASE_URL}/api/events`, data, { withCredentials: true })
      .then((res) => {
        setMessage(
          "Activity created successfully! Please wait while we redirect you to AboutME page."
        );
        setTimeout(() => {
          navigate("/me");
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    setSelectedFile(file);
    setPreviewSrc(URL.createObjectURL(file));
    const formData = new FormData();

    // Append the file to the FormData object
    formData.append("image", file);
    axios
      .post(`${API_BASE_URL}/api/image/upload`, formData, {
        withCredentials: true,
      })
      .then((res) => {
        setImageUrl(res.data.imageUrl);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const [selectedTags, setSelectedTags] = useState([]);
  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="relative flex justify-center h-60 gradient-bg">

        <div className="absolute translate-y-10 z-10">
          <img
            src="images/post-events.jpg"
            className="h-60 w-60 rounded-full object-cover "
            alt="post-events"
          />
        </div>
      </div>


      <div className="max-w-[850px] mx-auto mt-10 ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          onChange={() => setError(null)}
          className="px-6 font-bold flex flex-col gap-10 max-sm:gap-5"
        >
          <fieldset className="border rounded-md p-5 max-sm:p-2 mt-5 border-sky-300">
            <legend className="px-1 text-xl lg:text-2xl">Event Title</legend>
            <input
              type="text"
              required
              {...register("title")}
              className="block w-full py-2 outline-none "
            />
          </fieldset>

          <div className="flex max-sm:flex-col justify-between">
            <div>
              <p className="text-xl ">Start Time</p>
              <input
                required
                {...register("startTime")}
                type="datetime-local"
                min={new Date().toISOString().substring(0, 16)}
                className="bg-indigo-100 rounded-lg px-5 max-sm:w-full h-10"
              />
            </div>

            <div>
              <p className="text-xl">End Time</p>
              <input
                type="datetime-local"
                required
                min={new Date().toISOString().substring(0, 16)}
                {...register("endTime")}
                className="bg-sky-100 rounded-lg px-5 max-sm:w-full h-10"
              />
            </div>

            <div className="relative">
              <p className="text-xl">People</p>
              <input
                type="number"
                {...register("vacancy")}
                className="bg-emerald-100 rounded-lg px-5 max-sm:w-full h-10 w-28"
                max={500}
                min={1}
              />
              <BsPeopleFill className="absolute  right-5 top-10" />
            </div>
          </div>
          <fieldset className="border rounded-md p-3 border-sky-300 ">
            <legend className="text-xl lg:text-2xl">Select Tags:</legend>
            {/* <select {...register("tags")} multiple className="w-full p-2"> */}
            {tags.map((tag, index) => (
              <label key={tag} className="flex items-center space-x-2  p-2  ">
                <input
                  {...register("tags")}
                  type="checkbox"
                  value={tag}
                  checked={selectedTags.includes(tag)}
                  onChange={() => toggleTag(tag)}
                  className="hover:bg-sky-200"
                />
                <span>{tag}</span>
              </label>
            ))}
            {/* </select> */}
          </fieldset>
          <fieldset className="border rounded-md p-2 border-sky-300">
            <legend className="px-1 text-xl">Location</legend>
            <input
              required
              {...register("address")}
              type="text"
              className="block w-full py-2 outline-none "
              value={address || ""}
              onChange={handleAddressChange}
            />
          </fieldset>

          <div>
            <SmallMap
              address={address}
              setAddress={setAddress}
              setLocation={setLocation}
            />
          </div>

          <fieldset className="border rounded-md p-2 border-sky-300">
            <legend className="px-1 text-xl">Event Introduction</legend>
            <textarea
              required
              {...register("description")}
              className="w-full outline-none"
            />
          </fieldset>

          <fieldset className="border rounded-md p-2 border-sky-300">
            <legend className="px-1 text-xl">Event Image</legend>

            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="file:mr-4 file:rounded-full file:border-0 file:bg-violet-50
   file:px-4 file:py-2 file:text-sm file:font-semibold file:text-
   violet-700 mb-2"
            />

            {previewSrc && <img src={previewSrc} alt="Preview" />}
          </fieldset>
          <input
            type="text"
            placeholder={message}
            className="placeholder:text-red-500 w-full mt-4"
          />
          <button className="search-btn">POST</button>
        </form>
      </div>
    </div>
  );
}

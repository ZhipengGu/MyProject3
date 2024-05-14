//Homepage
import React, { useContext, useState, useEffect } from "react";
import EventInfoPreview from "../components/EventInfoPreview";
import TrendingEvents from "../components/TrendingEvents";
import hippo from "/images/hippo.svg";
import { AppContext } from "../context/AppContextProvider";
import Recommendations from "../components/RecommendationEvents";
import { defaultLocation } from "../utils/GetLocation.js";
import { AnimatePresence, motion } from "framer-motion";
import NearbyMap from "../components/NearbyMap.jsx";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

export default function HomePage({ setLoadingDisplay }) {
  const { user, userLocation } = useContext(AppContext);

  const fetch_urls = [
    `${API_BASE_URL}/api/events`,
    `${API_BASE_URL}/api/events/nearby?lat=${defaultLocation.lat}&lng=${defaultLocation.lng}&distance=0.5`,
  ];

  if (userLocation && userLocation.lat && userLocation.lng) {
    fetch_urls[1] = `${API_BASE_URL}/api/events/nearby?lat=${userLocation.lat}&lng=${userLocation.lng}&distance=0.5`;
    console.log("uerlocation got");
  }

  const promises = fetch_urls.map((url) =>
    fetch(url).then((res) => res.json())
  );

  if (user && user.tags) {
    const tags = user.tags;

    const req = fetch(`${API_BASE_URL}/api/events/tags`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tags }),
    }).then((res) => res.json());

    promises.push(req);
  } else {
    promises.push(
      fetch(`${API_BASE_URL}/api/events?page=1`).then((res) => res.json())
    );
  }

  const [loadingValues, setLoadingValues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    return () =>
      Promise.all(promises)
        .then((values) => {
          setLoadingValues(values);
        })
        .then(() => {
          setIsLoading(false);
          setLoadingDisplay(false);
        });
  }, []);

  // console.log(loadingValues[0]);

    return isLoading ? null : (
        <div>
            <div className="flex flex-col w-full ">
                <div className="relative ">
                    {/* Option 1: Add a image */}
                    {/* <img
                        src="/images/home-bg-texture.jpg"
                        className="opacity-80 h-96 w-full object-cover rounded-b-[50px] max-sm:h-60"
                    /> */}
                     {/* Option 2: Use gradient background */}
                    <div className=" h-80 w-full object-cover rounded-b-[50px] max-sm:h-60 gradient-bg">
                    </div>

          <img
            src={hippo}
            className="absolute top-14 h-32 left-1/2 transform -translate-x-1/2 max-sm:h-20 max-sm:top-7"
          />

          <div className="absolute top-[200px] max-sm:top-[110px] pl-32 max-lg:pl-6">
            <TrendingEvents events={loadingValues[0]} />
          </div>
        </div>

        {/* !!! Nearby Events & Recommendation section, will need to iterate later & add routes  */}
        <div className="flex flex-row px-12 mt-20 justify-around max-sm:flex-col max-lg:pl-6 max-lg:mt-10">
          <div>
            <motion.div
              initial={{ x: -200 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.5 }}
              className="section-name"
            >
              Nearby Events
            </motion.div>
            <div className="aspect-[3/2] rounded-2xl shadow-2xl shadow-gray-300 ">
              <NearbyMap events={loadingValues[1]} />
            </div>
          </div>

                    <div>
                        <motion.div
                            initial={{x: 200}}
                            animate={{x: 0}}
                            transition={{duration: 0.5}}
                            className="section-name"
                        >
                            Recommendation
                        </motion.div>
                        <Recommendations events={loadingValues[2]} />
                    </div>
                </div>

        {/* !!! Google map section, will need to modify later  */}
        {/*<div className="mt-10 max-lg:mt-5 px-12 max-lg:pl-6">*/}
        {/*    <div className="section-name ">Find your nearest events</div>*/}
        {/*    <div>*/}
        {/*        <EventMap events={loadingValues[1]} freeze={true}/>*/}
        {/*    </div>*/}
        {/*</div>*/}
      </div>
    </div>
  );
}

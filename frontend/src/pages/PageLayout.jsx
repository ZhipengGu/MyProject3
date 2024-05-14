import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation";
import { motion, easeInOut } from "framer-motion";

export default function PageLayout() {
  return (
    <motion.div
      initial={{ y: "100vh" }}
      animate={{ y: 0 }}
      exit={{ y: "-100vh" }}
      transition={{ duration: 1, ease: easeInOut, delay: 0.2 }}
    >
      <div className=" max-h-screen flex flex-col ">
        <div className="overflow-y-auto flex-grow pb-20">
          <Outlet />
        </div>
      </div>
      <div className="absolute bottom-0 w-full">
        <Navigation />
      </div>
    </motion.div>
  );
}

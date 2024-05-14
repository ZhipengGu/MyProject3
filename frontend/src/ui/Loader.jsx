import React from "react";
import "./Loader.css";
import { easeInOut, motion } from "framer-motion";

export default function Loader() {
  return (
    <motion.div
      initial={{
        height: "100vh",
        top: 0,
      }}
      animate={{
        height: "100vh",
      }}
      exit={{
        height: "0",
      }}
      transition={{ duration: 1, ease: easeInOut }}
      className="flex justify-center items-center flex-col top-0 left-0 w-full h-full fixed z-50 bg-gradient-to-r from-indigo-300 from-10% via-sky-300 via-30% to-emerald-300 to-90%"
    >
      <p className="text-[50px] max-sm:text-2xl text-white text-center font-semibold mb-20">Connect, Create, Experience<br/> With <span className=" text-sky-400 bounce mt-10 ">Hippos!</span></p>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 4 }}
        className="loader w-[100px] h-[100px] bg-white rounded-full"
      >
      </motion.div>

    </motion.div>
  );
}

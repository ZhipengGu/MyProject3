import express from "express";
import authRoute from "./api/auth-API.js";
import userRoute from "./api/user-API.js";
import deviceRoute from "./api/device-API.js";

const router = express.Router();

import eventRoute from "./api/event-API.js";
import attendRoute from "./api/attend-API.js";
import likeRoute from "./api/like-API.js"
import imageUploadRoute from "./api/imageUpload.js"

//API related to users
router.use("/api/auth",authRoute);
router.use("/api/users",userRoute);
router.use("/api/device",deviceRoute);

//API related to events
router.use("/api/events", eventRoute);
router.use("/api/attends", attendRoute);
router.use("/api/likes", likeRoute);
router.use("/api/image",imageUploadRoute);

export default router;
import dotenv from "dotenv";
dotenv.config();

import User from "./models/Users-schema.js";
import Event from "./models/Event-schema.js";
import Like from "./models/Like-schema.js";
import Attend from "./models/Attend-schema.js";

import addRandomRecord from "./dummyData.js";

import mongoose from "mongoose";

// drop all collections
mongoose.connection.dropCollection("users");
mongoose.connection.dropCollection("events");

console.log("Dropped all collections");

mongoose
    .connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
        console.log("DB connected successfully")
    ).then(async () =>
    await addRandomRecord({User, Event, Like, Attend})
).then(() => {
    console.log("Data generated successfully");
    process.exit(0);
});
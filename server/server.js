import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

import apiRouter from './api/api.js';
import notFoundResponse from "./helpers/ApiResponse.js";

dotenv.config();

var app = express();

function setupServer() {
    app.use(cors()); // TODO only for local dev only

    app.listen(process.env.PORT || 8080);

    app.use("/api/", apiRouter);

    app.all("*", function (req, res) {
        return notFoundResponse(res, "Page not found");
    });

    console.log("Server is up")
}

function setupDbConnection() {
    mongoose.connection
        .on('error', console.error)
        .on('disconnected', setupDbConnection)
        .once('open', setupServer);

    mongoose.connect(process.env.MONGODB_URL, {
        keepAlive: 1,
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}

setupDbConnection();

export default app;





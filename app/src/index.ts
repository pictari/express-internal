import express, { Application, Request, Response } from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import gameRouter from "./routes/game";
import "reflect-metadata";
const cors = require('cors');

dotenv.config();

const PORT = 3000;
const app: Application = express();

//TODO: limit CORS once we're out of testing phase
app.use(cors());

app.use(morgan("tiny"));
app.use(express.json());

// register all endpoint routers
app.use('/', gameRouter);

var server = app.listen(PORT, function () {
    console.log("Listening on port: " + PORT)
});
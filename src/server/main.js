//const express = require("express");
import express from "express";
//const ViteExpress = require("vite-express");
import ViteExpress from "vite-express";
import cors from "cors";
import { authString } from "./authHandler.js";

//import generateCalendar from "./calendar.js";

const app = express();

/*import { 
  getLectors, 
  createLector, 
  getLectorById, 
  editLector, 
  deleteLector, 
  tryLoginUser, 
  verifyToken,
  createBooking,
  getMyBookings,
  getBookedTimes,
  deleteBooking
} from "./dbHandler.js";

import { getFiltered } from "./getFilter.js";
import { getFilterData } from "./setFilteringData.js";

import { logThatBastard } from "./flagCatcher.js";
import dayjs from "dayjs";*/

import { aiResp } from "./aiHandler.js";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function clientErrorHandler (err, req, res, next) {
  if (req.xhr) {
     res.status(500).send({ error: 'Something failed!' })
   } else {
     next(err)
  }
} 

app.use(clientErrorHandler);

/*app.get("/api", cors(), (req, res) => {
  res.send({ secret: "The cake is a lie" });
});

app.post("/api/lecturers", cors(), async (req, res) => {
  const input = req.body;

  logThatBastard(req.body);

  console.log(req.headers.authorization);

  if (req.headers.authorization != authString) {
    res.status(401);
    res.send({ message: "Unauthorized" });
    return;
  }

  const result = await createLector(input);

  if (result.code) {
    res.status(result.code);
  }

  res.send(result);
});

app.get("/api/lecturers", cors(), async (req, res) => {
  const result = await getLectors();

  res.send(result);
});

app.get("/api/lecturers/:uuid", cors(), async (req, res) => {
  const uuid = req.params.uuid;

  console.log(uuid);

  const result = await getLectorById(uuid);

  if (result.code) {
    res.status(404);
  }

  res.send(result);
});

app.put("/api/lecturers/:uuid", cors(), async (req, res) => {
  const uuid = req.params.uuid;
  const input = req.body;

  if (req.headers.authorization != authString) {
    res.status(401);
    res.send({ message: "Unauthorized" });
    return;
  }

  const result = await editLector(uuid, input);

  if (result.code) {
    res.status(404);
  }

  res.send(result);
});

app.delete("/api/lecturers/:uuid", cors(), async (req, res) => {
  const uuid = req.params.uuid;

  if (req.headers.authorization != authString) {
    res.status(401);
    res.send({ message: "Unauthorized" });
    return;
  }

  const result = await deleteLector(uuid);

  res.status(result.code);

  res.send(result);
});

app.post("/api/filterLecturers", cors(), async (req, res) => {
  const input = req.body;

  console.log(req.body);

  input.page ??= 1;
  input.tags ??= [];
  input.location ??= [];
  input.priceMin ??= 0;
  input.priceMax ??= 10000;

  const result = await getFiltered(
    input.page, 
    input.tags, 
    input.location,
    input.priceMin,
    input.priceMax,
  );

  res.send(result);
});

app.get("/api/filterData", cors(), async (req, res) => {
  const result = await getFilterData();

  res.send(result);
});

app.post("/api/login", cors(), async (req, res) => {
  const input = req.body;

  let username = input.username;
  let password = input.password;

  let result = await tryLoginUser(username, password);

  if (result.code) {
    res.status(result.code);
  }

  res.send(result);
  
});

app.post("/api/verifyToken", cors(), async (req, res) => {
  const input = req.body;

  let token = input.token;

  let result = await verifyToken(token);


  res.send(result);
});

app.post("/api/createBooking", cors(), async (req, res) => {
  const input = req.body;

  let result = await createBooking(input);

  if (result.code) {
    res.status(result.code);
  }

  res.send(result);
});

app.post("/api/myBookings", cors(), async (req, res) => {
  const input = req.body;

  let result = await getMyBookings(input.token);

  if (result.code) {
    res.status(result.code);
  }

  res.send(result);
});

app.post("/api/getBookedTimes", cors(), async (req, res) => {
  const input = req.body;

  let result = await getBookedTimes(input.uuid);

  if (result.code) {
    res.status(result.code);
  }

  res.send(result);
});

app.get("/api/calendar/:token", cors(), async (req, res) => {

  let token = req.params.token;
  token = token.replaceAll("&", "/");

  let today = dayjs().format("YYYY-MM-DD");

  res.header("Content-Type", "text/calendar");
  res.header("Content-Disposition", "attachment; filename="+today+"_plan-vyuky.ics");
  res.send(await generateCalendar(token));
});

app.post("/api/deleteBooking", cors(), async (req, res) => {
  const input = req.body;
  const uuid = input.uuid;
  const token = input.token;

  let result = await deleteBooking(uuid, token);

  if (result.code) {
    res.status(result.code);
  }

  res.send(result);
});*/

app.post("/api/ai", cors(), async (req, res) => {
  const input = req.body.prompt;

  console.log(input);

  let fromAI = await aiResp(input);

  res.send({ message: fromAI });
});

if (process.argv[2] == "prod") {
  ViteExpress.config(
    {
      mode: "production"
    }
  );
}

ViteExpress.listen(app, 8080, () =>
  console.log("Server is listening on port 8080...")
);

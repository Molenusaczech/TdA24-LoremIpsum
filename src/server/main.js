//const express = require("express");
import express from "express";
//const ViteExpress = require("vite-express");
import ViteExpress from "vite-express";
import cors from "cors";
import { authString } from "./authHandler.js";

import { sequelize } from "./dbModels.js";

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

import { 
  createActivity, 
  getActivity,
  getAllActivities,
  deleteActivity,
  verifyActivity,
  tryLogin,
  getActivityAll,
  getAllActivitiesAll
} from "./activityHandler.js";

import { aiResp, aiSumActivity } from "./aiHandler.js";

app.use(express.json());
//app.use(express.urlencoded({ extended: true }));
app.use(express.urlencoded())

function clientErrorHandler (err, req, res, next) {
  if (req.xhr) {
     res.status(500).send({ error: 'Something failed!' })
   } else {
     next(err)
  }
} 

app.use(clientErrorHandler);


app.post("/api/ai", cors(), async (req, res) => {
  const input = req.body.prompt;

  console.log(input);

  let fromAI = await aiSumActivity(input);

  res.send({ message: fromAI });
});

app.post("/api/activity", cors(), async (req, res) => {
  const input = req.body;

  console.log(req.body);

  // toto je z scg serveru

  let resp = await createActivity(input, true);

  res.send(resp);
});

app.get("/api/activity/:uuid", cors(), async (req, res) => {
  const uuid = req.params.uuid;

  console.log(uuid);

  const result = await getActivity(uuid);

  if (result.code) {
    res.status(404);
  }

  res.send(result);
});

app.get("/api/activityAll/:uuid", cors(), async (req, res) => {
  const uuid = req.params.uuid;

  console.log(uuid);

  const result = await getActivityAll(uuid);

  if (result.code) {
    res.status(404);
  }

  res.send(result);
});

app.get("/api/activityAll", cors(), async (req, res) => {
  const result = await getAllActivitiesAll();

  res.send(result);
});

app.get("/api/activity", cors(), async (req, res) => {
  const result = await getAllActivities();

  res.send(result);
});

app.get("/api/activityAdmin", cors(), async (req, res) => {
  const result = await getAllActivities(true);

  res.send(result);
});

app.delete("/api/activity/:uuid", cors(), async (req, res) => {
  const uuid = req.params.uuid;

  const result = await deleteActivity(uuid);

  res.status(result.code);

  res.send(result);
});

app.post("/api/createActivity", cors(), async (req, res) => {
  const input = req.body;

  // toto je z klientu

  let resp = await createActivity(input);

  res.send({ response: resp });
});

app.post("/api/verifyActivity", cors(), async (req, res) => {
  const input = req.body;

  let resp = await verifyActivity(input.uuid);

  res.send({ response: resp });
});

app.post("/api/login", cors(), async (req, res) => {
  const input = req.body;

  let username = input.username;
  let password = input.password;

  let result = await tryLogin(username, password);

  res.send(result);
  
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

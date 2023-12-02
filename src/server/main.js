//const express = require("express");
import express from "express";
//const ViteExpress = require("vite-express");
import ViteExpress from "vite-express";
import cors from "cors";

const app = express();

import { db } from "./dbHandler.js";
import { initDb } from "./initdb.js";
import { getLectors, createLector, getLectorById, editLector, deleteLector } from "./dbHandler.js";

initDb();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/api", cors(), (req, res) => {
  res.send({ secret: "The cake is a lie" });
});

app.post("/lecturers", cors(), (req, res) => {
  const input = req.body;

  const result = createLector(input);

  res.send(result);
});

app.get("/lecturers", cors(), (req, res) => {
  const result = getLectors();

  res.send(result);
});

app.get("/lecturers/:uuid", cors(), (req, res) => {
  const uuid = req.params.uuid;

  console.log(uuid);

  const result = getLectorById(uuid);

  if (result.code) {
    res.status(404);
  }

  res.send(result);
});

app.put("/lecturers/:uuid", cors(), (req, res) => {
  const uuid = req.params.uuid;
  const input = req.body;

  const result = editLector(uuid, input);

  if (result.code) {
    res.status(404);
  }

  res.send(result);
});

app.delete("/lecturers/:uuid", cors(), (req, res) => {
  const uuid = req.params.uuid;

  const result = deleteLector(uuid);

  res.status(result.code);

  //res.send(result);
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

//const express = require("express");
import express from "express";
//const ViteExpress = require("vite-express");
import ViteExpress from "vite-express";

const app = express();

import { db } from "./dbHandler.js";
import { initDb } from "./initdb.js";
import { getLectors, createLector, getLectorById, editLector, deleteLector } from "./dbHandler.js";

initDb();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/api", (req, res) => {
  res.send({ secret: "The cake is a lie" });
});

app.post("/lecturers", (req, res) => {
  const input = req.body;

  const result = createLector(input);

  res.send(result);
});

ViteExpress.listen(app, 8080, () =>
  console.log("Server is listening on port 8080...")
);

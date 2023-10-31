//const express = require("express");
import express from "express";
//const ViteExpress = require("vite-express");
import ViteExpress from "vite-express";

const app = express();

//const Database = require('better-sqlite3');
/*import Database from "better-sqlite3";
const db = new Database('database.sqlite', { verbose: console.log });*/

import { db } from "./dbHandler.js";
import { initDb } from "./initdb.js";

initDb();

app.get("/hello", (req, res) => {
  res.send("Hello Vite!");
});

app.get("/hello/:name", (req, res) => {
  res.send(`Hello ${req.params.name}!`);
});

app.post("/initDb", (req, res) => {
  db.prepare(`CREATE TABLE IF NOT EXISTS Accounts (
    Account_ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Username varchar(32) UNIQUE NOT NULL,
    Password varchar(32) NOT NULL
  )`).run();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*app.post("/createAccount", (req, res) => {
  try {
    
    db.prepare(`INSERT INTO Accounts (Username, Password) VALUES (?, ?)`).run(req.body.username, req.body.password);
    res.send("Account created");
  } catch (err) {
    console.log(err);
    res.send("Account creation failed");
  }
});*/

app.get("/api", (req, res) => {
  res.send({ secret: "The cake is a lie" });
});

/*app.listen(3000, () =>
  console.log("Server is listening on port 3000...")
);
*/
ViteExpress.listen(app, 8080, () =>
  console.log("Server is listening on port 8080...")
);

/*
setInterval(() => {
  console.log("ping");
}, 1000);*/
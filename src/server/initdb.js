import { db } from "./dbHandler.js";

function initDb() {
  db.prepare(`CREATE TABLE IF NOT EXISTS Lectors (
    UUID varchar(36) PRIMARY KEY UNIQUE NOT NULL,
    title_before varchar(16),
    first_name varchar(32) NOT NULL,
    middle_name varchar(32),
    last_name varchar(32) NOT NULL,
    title_after varchar(16),
    picture_url varchar(256),
    location varchar(64),
    claim varchar(256),
    bio varchar(2048),
    price_per_hour integer
  )`).run();

  db.prepare(`CREATE TABLE IF NOT EXISTS tags (
    uuid varchar(36) PRIMARY KEY UNIQUE NOT NULL,
    name varchar(16) NOT NULL,
    lector_uuid varchar(36) NOT NULL
  )`).run();

  db.prepare(`CREATE TABLE IF NOT EXISTS telephone_numbers (
    telephone_uuid varchar(36) PRIMARY KEY UNIQUE NOT NULL,
    number varchar(17) NOT NULL,
    lector_uuid varchar(36) NOT NULL
  )`).run();

  db.prepare(`CREATE TABLE IF NOT EXISTS email (
    email_uuid varchar(36) PRIMARY KEY UNIQUE NOT NULL,
    email varchar(64) NOT NULL,
    lector_uuid varchar(36) NOT NULL
  )`).run();

  console.log('Database initialized');
}

export { initDb };
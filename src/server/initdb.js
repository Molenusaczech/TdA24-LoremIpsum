import { db } from "./dbHandler.js";

function initDb() {
  db.prepare(`CREATE TABLE IF NOT EXISTS Accounts (
    Account_ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Username varchar(32) UNIQUE NOT NULL,
    Password varchar(32) NOT NULL
  )`).run();

  console.log('Database initialized');
}

export { initDb };
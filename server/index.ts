import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

// Make a new database object, which will create a new file if one doesn't already exist in the directory data
const db = new sqlite3.Database("./data/database.db", (err: any) => {
  if (err) {
    console.error(err.message);
  }
  // add a new table to the database if it doesn't already exist
  db.run(
    `CREATE TABLE IF NOT EXISTS history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      result TEXT NOT NULL,
      equation TEXT NOT NULL,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
    (err: any) => {
      if (err) {
        console.log(err.message);
      }
    }
  );
  console.log("Connected to the database.");
});

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

type History = {
  id: number;
  result: string;
  equation: string;
  timestamp: Date;
};

app.post("/history", (req: Request, res: Response) => {
  // Post a new history
  console.log(req.body);
  const { history } = req.body;

  db.run(
    `INSERT INTO history (result, equation, timestamp) VALUES (?, ?, ?)`,
    [history.result, history.equation, history.timestamp],
    function (err: any) {
      if (err) {
        return console.log(err.message);
      }
    }
  );

  res.send("History added to database.");
});

app.get("/history", (req: Request, res: Response) => {
  // get history, if limit added to query, limit the number of results
  // sort by timestamp, latest first

  let limit = req.query.limit;

  db.all(
    `SELECT * FROM history ORDER BY timestamp DESC ${
      limit ? `LIMIT ${limit}` : ""
    }`,
    [],
    (err: any, rows: History[]) => {
      if (err) {
        throw err;
      }
      res.send(rows);
    }
  );
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

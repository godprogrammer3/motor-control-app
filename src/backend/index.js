const express = require("express");
const app = express();
const http = require("http").createServer(app);
var cors = require("cors");
var bodyParser = require("body-parser");
const mariadb = require("mariadb");
var pool = mariadb.createPool({
  host: "localhost",
  user: "godprogrammer",
  password: "gly33140",
  database: "MotorControl",
  connectionLimit: 50,
});
class Backend {
  init() {
    app.use(cors());
    app.use(bodyParser.json());
    app.get("/getAllJobList", async (req, res) => {
      let conn = await pool.getConnection();
      let result = await conn.query("SELECT * FROM JobList;");
      conn.release();
      res.send(result);
    });
    http.listen(3000, () => {
      console.log("listening on :3000");
    });
  }
}

export default Backend;

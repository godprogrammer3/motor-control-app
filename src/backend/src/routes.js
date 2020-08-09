const express = require("express");
const router = express.Router();
const em = require("./Event").em;
const mariadb = require("mariadb");
var dotenv = require("dotenv");
dotenv.config();
var pool = mariadb.createPool({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "MotorControl",
  connectionLimit: 50,
});
router.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
router.get("/getAllJobList", async (req, res) => {
  let conn = await pool.getConnection();
  let result = await conn.query("SELECT * FROM JobList;");
  conn.release();
  res.send(result);
});

router.delete("/deleteJob/:jobId", async (req, res) => {
  let conn = await pool.getConnection();
  console.log(req.params.jobId);
  let result = await conn.query(
    `DELETE FROM JobList WHERE jobId = "${req.params.jobId}";`
  );
  conn.release();
  res.status(200).send("delete success");
});

router.post("/createJob", async (req, res) => {
  let conn = await pool.getConnection();
  console.log(req.body);
  const sql = `INSERT INTO JobList (jobId, length, status, onTop, overhead, createdTime,workTime)
    VALUES ('${req.body.jobId}', ${req.body.length}, 0, 20, 0, '${new Date()
    .toISOString()
    .slice(0, 19)
    .replace("T", " ")}','${req.body.workTime}')`;
  let result = await conn.query(sql);
  conn.release();
  res.status(200).send("create success");
});

router.put("/editJob", async (req, res) => {
  let conn = await pool.getConnection();
  console.log(req.body);
  const sql = `UPDATE JobList 
    SET 
        jobId = "${req.body.jobId}",
        length = "${req.body.length}",
        workTime = "${req.body.workTime}"
    WHERE
        jobId = "${req.body.oldJobId}";`;
  let result = await conn.query(sql);
  conn.release();
  res.status(200).send("edit success");
});

router.get("/getJobListByDate", async (req, res) => {
  console.log(req.url);
  let type = req.query.type;
  let count = req.query.value.split("-").length - 1;
  if (count === 0) {
    req.query.value += "-01-01";
  } else if (count === 1) {
    req.query.value += "-01";
  }
  let value = req.query.value;
  let sql;
  let conn = await pool.getConnection();
  if (type === "year") {
    sql = `SELECT * FROM JobList WHERE YEAR(workTime) =  YEAR("${value}");`;
    let result = await conn.query(sql);
    conn.release();
    res.send(result);
  } else if (type === "month") {
    sql = `SELECT * FROM JobList WHERE MONTH(workTime) =  MONTH("${value}") AND YEAR(workTime) = YEAR("${value}");`;
    let result = await conn.query(sql);
    conn.release();
    res.send(result);
  } else if (type === "date") {
    sql = `SELECT * FROM JobList WHERE DATE(workTime) =  DATE("${value}");`;
    let result = await conn.query(sql);
    conn.release();
    res.send(result);
  } else {
    res.status(400).send("Bad request.");
  }
});

router.get("/getSetting", async (req, res) => {
  let conn = await pool.getConnection();
  let result = await conn.query("SELECT * FROM Setting;");
  conn.release();
  res.send(result[0]);
});

router.put("/editSetting", async (req, res) => {
  let conn = await pool.getConnection();
  console.log(req.body);
  const sql = `UPDATE Setting 
  SET 
      defaultOnTop = "${req.body.defaultOnTop}",
      defaultSlowModeVelocity = "${req.body.defaultSlowModeVelocity}"
  WHERE  1`;
  let result = await conn.query(sql);
  conn.release();
  res.status(200).send("edit success");
});

router.post("/start", (req, res) => {
  em.emit("start", { onTop: 3, target: 20 });
  res.sendStatus(200);
});
router.post("/process", (req, res) => {
  console.log("Process");
  em.emit("process");
  res.sendStatus(200);
});
router.post("/stop", (req, res) => {
  em.emit("stop");
  res.sendStatus(200);
});

router.put("/changeTarget", (req, res) => {
  em.emit("changeTarget", req.body.target);
  res.sendStatus(200);
});
router.put("/changeOnTop", (req, res) => {
  em.emit("changeOnTop", req.body.onTop);
  res.sendStatus(200);
});
router.put("/setMode", (req, res) => {
  em.emit("setMode", req.body.mode); //"auto" or "manual"
  res.sendStatus(200);
});
router.put("/setSlow", (req, res) => {
  em.on("ModeSlow", req.body.slow); // true or false
  res.sendStatus(200);
});

module.exports = router;

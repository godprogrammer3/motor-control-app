var events = require("events");
var em = new events.EventEmitter();
var dotenv = require("dotenv");
dotenv.config();

const io = require("socket.io");

const Modbus = require("jsmodbus");
const net = require("net");

const socket1 = new net.Socket();
const client1 = new Modbus.client.TCP(socket1, 1);
const options1 = {
  host: process.env.host_1,
  port: 502,
};
const socket2 = new net.Socket();
const client2 = new Modbus.client.TCP(socket2, 2);
const options2 = {
  host: process.env.host_2,
  port: 502,
};

var encoder1 = 0,
  encoder2 = 0;
var Lenght1 = 0,
  Lenght2 = 0;
var onTop = 0,
  target = 0;
var tempEncoder1 = 0,
  tempEncoder2 = 0;
var speed1 = 0;
(speed2 = 0), (SpeedTaget = 0);
var wirteSpeed = false;
var intervalRead1, intervalRead2, intervalProcess, intervalStart;

socket1.on("connect", function() {
  console.log("IO_1 connected");
  client1.writeMultipleRegisters(3, [0, 0]);
  client1.writeMultipleCoils(0, [0, 0, 0, 0]);
  intervalRead1 = setInterval(async function() {
    let resp = await client1.readHoldingRegisters(3, 2);
    encoder1 = resp.response.body.valuesAsArray[1];
    Lenght1 = ((encoder1 / 100) * (2 * Math.PI * process.env.radius)) / 100;
    speed1 = (parseInt(encoder1) - tempEncoder1) / 0.1; //.toFixed(2);
    tempEncoder1 = encoder1;
  }, 100);
});
socket2.on("connect", function() {
  console.log("IO_2 connected");
  client2.writeMultipleRegisters(3, [0, 0]);
  client2.writeMultipleCoils(0, [0, 0, 0, 0]);
  intervalRead2 = setInterval(async function() {
    let resp = await client2.readHoldingRegisters(3, 2);
    encoder2 = resp.response.body.valuesAsArray[1];
    Lenght2 = ((encoder2 / 100) * (2 * Math.PI * process.env.radius)) / 100;
    speed2 = (parseInt(encoder2) - tempEncoder2) / 0.1; //.toFixed(2);
    tempEncoder2 = encoder2;
  }, 100);
});

const socket = (io) => {
  em.on("start", async (setting) => {
    console.log("start");
    socket1.connect(options1);
    socket2.connect(options2);
    (encoder1 = 0), (encoder2 = 0);
    (Lenght1 = 0), (Lenght2 = 0);
    (tempEncoder1 = 0), (tempEncoder2 = 0);
    speed1 = 0;
    speed2 = 0;
    wirteSpeed = false;
    onTop = Number(setting.onTop);
    target = Number(setting.target);

    intervalStart = setInterval(() => {
      io.emit("ENC1", encoder1);
    }, 100);
  });
  em.on(
    "process",
    async () => {
      console.log("processing");
      clearInterval(intervalStart);
      intervalProcess = setInterval(() => {
        io.emit("Speed1", speed1);
        io.emit("Speed2", speed2);
        io.emit("ENC1", encoder1);
        io.emit("ENC2", encoder2);
        io.emit("Lenght1", Lenght1);
        io.emit("Lenght2", Lenght2);
        io.emit("onTop", onTop);
        io.emit("onTopReal", Lenght1 - Lenght2);

        if (Lenght1 >= target) {
          client1.writeSingleCoil(1, 1);
        }
        if (Lenght2 >= target) {
          clearInterval(intervalRead1);
          clearInterval(intervalRead2);
          setTimeout(() => {
            em.emit("stop");
          }, 3000);
        }
        if (Lenght1 > target - 3 && Lenght1 < target) {
          SpeedTaget = 30 + (speed1 * (target - Lenght1)) / 3.0;
          //console.log((target - Lenght1) / 3.0);
        } else {
          SpeedTaget = speed2 + (Lenght2 + onTop - Lenght1) * 40;
          // console.log((Lenght2+onTop-Lenght1)*40)
        }
        if (!wirteSpeed) {
          wirteSpeed = true;
          if (speed1 < SpeedTaget) {
            client1.writeSingleCoil(0, 1);
            // console.log('Up Speed')
            setTimeout(() => {
              client1.writeSingleCoil(0, 0);
              wirteSpeed = false;
            }, 10);
          } else if (speed1 > SpeedTaget) {
            client1.writeSingleCoil(1, 1);
            //console.log('Down Speed')
            setTimeout(() => {
              client1.writeSingleCoil(1, 0);
              wirteSpeed = false;
            }, 10);
          } else {
            console.log(speed1 + " = " + SpeedTaget);
            wirteSpeed = false;
          }
        }
      });
    },
    10
  );

  em.on("stop", () => {
    socket1.destroy();
    socket2.destroy();

    clearInterval(intervalStart);
    clearInterval(intervalProcess);
    console.log("Job finished");
  });
};

em.on("resetIO", () => {
  socket1.connect(options1);
  socket2.connect(options2);
  setTimeout(() => {
    socket1.destroy();
    socket2.destroy();
    clearInterval(intervalRead1);
    clearInterval(intervalRead2);
    clearInterval(intervalProcess);
    console.log("resrtIO");
  }, 100);
});

module.exports = {
  em,
  socket,
};

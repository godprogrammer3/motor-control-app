var events = require('events');
var em = new events.EventEmitter();

var dotenv = require("dotenv");
dotenv.config();

const Modbus = require('jsmodbus')
const net = require('net');

const socket1 = new net.Socket();
const client1 = new Modbus.client.TCP(socket1, 1);
const options1 = {
    host: process.env.host_1,
    port: 502
};
const socket2 = new net.Socket();
const client2 = new Modbus.client.TCP(socket2, 2);
const options2 = {
    host: process.env.host_2,
    port: 502
};


var encoder1 = 0, encoder2 = 0;
var tempEncoder1 = 0, tempEncoder2 = 0;

var Lenght1 = 0, Lenght2 = 0;
var onTop = 0, target = 0;;

var speed1 = 0; speed2 = 0, SpeedTaget = 0, speedSlow = 0;
var wirteSpeed = false, auto = true, slow = false;
var intervalRead1, intervalRead2, intervalProcess, intervalStart;
var boolR = false, boolY = false, boolG = false;

socket1.on('connect', function () {
    console.log("IO_1 connected")
    client1.writeMultipleRegisters(3, [0, 0]);
    client1.writeMultipleCoils(0, [0, 0, 0, 0]);
    intervalRead1 = setInterval(async function () {
        let resp = await client1.readHoldingRegisters(3, 2);
        encoder1 = resp.response.body.valuesAsArray[1];
        Lenght1 = encoder1 / 100 * (2 * Math.PI * process.env.radius) / 100;
        speed1 = ((parseInt(encoder1) - tempEncoder1) * 10) / 100 * (2 * Math.PI * process.env.radius)//.toFixed(2);
        tempEncoder1 = encoder1;

        client1.writeMultipleCoils(2, [boolR, boolY, boolG])
    }, 100);
});
socket2.on('connect', function () {
    console.log("IO_2 connected")
    client2.writeMultipleRegisters(3, [0, 0]);
    client2.writeMultipleCoils(0, [0, 0, 0, 0])
    intervalRead2 = setInterval(async function () {
        let resp = await client2.readHoldingRegisters(3, 2);
        encoder2 = resp.response.body.valuesAsArray[1];
        Lenght2 = encoder2 / 100 * (2 * Math.PI * process.env.radius) / 100;
        speed2 = ((parseInt(encoder2) - tempEncoder2) * 10) / 100 * (2 * Math.PI * process.env.radius) //.toFixed(2);
        tempEncoder2 = encoder2;

        client2.writeMultipleCoils(1, [boolR, boolY, boolG])
    }, 100);


});




const socket = (io) => {
    em.on('start', async (data) => {
        console.log("start")
        socket1.connect(options1);
        socket2.connect(options2);
        encoder1 = 0, encoder2 = 0;
        Lenght1 = 0, Lenght2 = 0;
        tempEncoder1 = 0, tempEncoder2 = 0;
        speed1 = 0; speed2 = 0;
        onTop = Number(data.onTop);
        target = Number(data.target);

        boolR = true;

        intervalStart = setInterval(() => {
            io.emit("Lenght2", Lenght2);
        }, 100)

    })
    em.on('process', async () => {
        clearInterval(intervalStart);
        // Save Langht2 to DB (Lenght_Initial)
        // {

        // }
        encoder1 = 0, encoder2 = 0;
        Lenght1 = 0, Lenght2 = 0;
        tempEncoder1 = 0, tempEncoder2 = 0;
        speed1 = 0; speed2 = 0;
        wirteSpeed = false;

        boolR = false;
        boolY = true;
        var blink = false;
        

        intervalProcess = setInterval(() => {

            io.emit("Speed1", speed1);
            io.emit("Speed2", speed2);
            io.emit("ENC1", encoder1);
            io.emit("ENC2", encoder2);
            io.emit("Lenght1", Lenght1);
            io.emit("Lenght2", Lenght2);
            io.emit("onTop", onTop);
            io.emit("onTopReal", Lenght1 - Lenght2);
            io.emit("finished", false);

            if (Lenght1 >= target) {
                client1.writeSingleCoil(1, 1);
            }
            if (Lenght2 >= target) {
                client1.writeSingleCoil(1, 1);
                boolY = false;
                boolG = true;   
                if (speed1 === 0) {
                    io.emit("finished", true);
                    console.log("Job finished");
                    clearInterval(intervalProcess);
                    client1.writeSingleCoil(1, 0);
                }
            }

            if (Lenght1 > target - Number(process.env.LenghtDownSpeed) && Lenght1 < target) {
                SpeedTaget = Number(process.env.slowSpeed) + speed1 * Number(process.env.xSlow) * (target - Lenght1) / Number(process.env.LenghtDownSpeed);
                //console.log((target - Lenght1) / 3.0);
                if (!blink) {
                    boolY = false;
                    blink = true;
                    setTimeout(() => {
                        boolY = true;
                        setTimeout(() => {
                            blink = false;
                        }, 500);
                    }, 500);
                }
            }
            else {
                if (slow) {
                    SpeedTaget = speedSlow;
                }
                else if (speed2 === 0) {
                    SpeedTaget = 0;
                }
                else {
                    SpeedTaget = speed2 + (Lenght2 + onTop - Lenght1) * Number(process.env.xSpeed);
                    // console.log((Lenght2+onTop-Lenght1)*40);
                }

            }
            if (!wirteSpeed && auto) {
                wirteSpeed = true;
                if (speed1 < SpeedTaget) {
                    client1.writeSingleCoil(0, 1);
                    // console.log('Up Speed');
                    setTimeout(() => {
                        client1.writeSingleCoil(0, 0);
                        wirteSpeed = false;
                    }, 10);
                }
                else if (speed1 > SpeedTaget) {
                    client1.writeSingleCoil(1, 1)
                    //console.log('Down Speed');
                    setTimeout(() => {
                        client1.writeSingleCoil(1, 0);
                        wirteSpeed = false;
                    }, 10)
                }
                else {
                    wirteSpeed = false;
                }
            }

        })
    })
};

em.on('close', () => {
    clearInterval(intervalRead1);
    clearInterval(intervalRead2);
    clearInterval(intervalStart);
    clearInterval(intervalProcess);
    client1.writeMultipleCoils(0, [0, 0]);
    setTimeout(() => {
        socket1.destroy();
        socket2.destroy();
        console.log("DisconnectIO");
    }, 5000);
    //save to DB
})

em.on('resetIO', () => {
    socket1.connect(options1);
    socket2.connect(options2);
    setTimeout(() => {
        clearInterval(intervalRead1);
        clearInterval(intervalRead2);
        setTimeout(() => {
            socket1.destroy();
            socket2.destroy();
            console.log("resrtIO");
        }, 2000)
    }, 100);
});


em.on("stop", () => {
    clearInterval(intervalStart);
    clearInterval(intervalProcess);
    clearInterval(intervalRead1);
    clearInterval(intervalRead2);
    client1.writeSingleCoil(1, 1)
    setTimeout(() => {
        client1.writeSingleCoil(1, 0);
        em.emit('close');
    }, 5000);
});


em.on("changeTarget", (newTarget) => {
    target = Number(newTarget);
    console.log("changeTarget : " + newTarget);
});
em.on("changeOnTop", (newOnTop) => {
    onTop = Number(newOnTop);
    console.log("changeOnTop : " + newOnTop);
});
em.on('setMode', (newMode) => {
    auto = newMode === 'manual' ? false : true;
    console.log("Mode is auto?: " + auto);
});
em.on('slowMode', (newSlow) => {
    slow = newSlow;

    speedSlow = 30; // get from DB

    console.log("isSlow : " + slow);
});


module.exports = {
    em,
    socket
}

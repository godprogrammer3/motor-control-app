class Backend {
  init(win) {
    const express = require("express");
    const app = express();

    const http = require("http").createServer(app);
    const io = require("socket.io")(http, { serveClient: false });
    require("./src/Event").socket(io);
    const event = require("./src/Event").em;

    var cors = require("cors");
    var bodyParser = require("body-parser");

    var Routes = require("./src/routes");
    app.use(cors());
    app.use(bodyParser.json());

    app.use("/", Routes);

    //event.emit("resetIO");

    // app.listen("3000", () => {
    //   console.log("Server started on port 3000");
    // });
    http.listen(3000, () => {
      console.log("listening on *:3000");
    });
  }
}

export default Backend;

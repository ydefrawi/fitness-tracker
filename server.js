const express = require("express");
const mongojs = require("mongojs");
const mongoose = require("mongoose");
const logger = require("morgan")
const path = require("path");

//mongo
const databaseUrl = "fitness";
const collections = ["workouts"];
const db = mongojs(databaseUrl, collections);

//express
const app = express();
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.use(require("./routes"));


db.on("error", error => {
    console.log("Database Error:", error);
  });

// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workoutDB", {
//     useNewUrlParser: true,
//     useFindAndModify: false
// });

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "./public/index.html"));
  });

app.delete("/clearall", (req, res) => {
    db.workouts.remove({}, (error, response) => {
      if (error) {
        res.send(error);
      } else {
        res.send(response);
      }
    });
  });


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
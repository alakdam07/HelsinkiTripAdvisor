require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const logs = require("./src/api/logs");
const mongoose = require("mongoose");

//app middlewear
app.use(morgan("common"));
app.use(helmet());
app.use(cors());
app.use(express.json()); //body Parser

mongoose
  .connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => console.log("DB Connected!"))
  .catch(err => {
    console.log(err);
  });

//using router's path
app.use("/api", logs);
app.use(express.static(__dirname + "build"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", index.html));
});
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`🚀 App is listening at port ${port}!`));

//mongodb+srv://MyhelsinkiTravel:Joymaaloknath123@cluster0-smhek.mongodb.net/test?retryWrites=true&w=majority

//$(heroku config:get DATABASE_URL -a myfinland) nodemon
//MONGODB_URI=$(heroku config:get MONGODB_URI -a finlandtripadvisor2020) nodemon

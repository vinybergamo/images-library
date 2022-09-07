require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const dbName = process.env.DB_NAME;
const port = process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(require("./routes/index"));

mongoose
  .connect(
    `mongodb+srv://${dbUser}:${dbPass}@imageupload.kh1s9ts.mongodb.net/${dbName}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
    }
  )
  .then(() => {
    app.listen(port);
    console.log("Conectado com sucesso na porta", port);
  })
  .catch((err) => console.log(err));

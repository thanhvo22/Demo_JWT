import * as dotenv from "dotenv";
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const app = require("./app");

if (!process.env.PORT) {
  process.exit(1);
}
const PORT: number = parseInt(process.env.PORT);
const uri: string = `mongodb://localhost:27017/testTS`;

mongoose
  .connect(uri)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  )
  .catch((err: Error) => {
    throw err;
  });

const express = require("express");
const connectToDb = require("./connect");

const app = express();
const PORT = 8001;

const urlRoutes = require("./Route/url");
connectToDb("mongodb://127.0.0.1:27017/short-url").then(() => {
  console.log("MongoDB Connected");
});

app.use(express.json());
app.use("/url", urlRoutes);

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});

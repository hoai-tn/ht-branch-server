const express = require("express");

const app = express();
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.listen("8989", () => {
  console.log(`app listening on port ${8989}`);
});

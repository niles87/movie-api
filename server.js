const express = require("express");
const api = require("./routes");
const PORT = process.env.PORT || 3001;
const app = express();

// boiler plate middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// api routes
app.use("/api", api);

app.listen(PORT, () => {
  console.log("🌎  running on port 3001");
});

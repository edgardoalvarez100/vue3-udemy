import "dotenv/config";
import "./databases/connectdb.js";
import express from "express";

import router from "./routers/auth.route.js";

const app = express();
app.use(express.json());
app.use("/api/v1/auth", router);

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.json({ ok: true });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("servidor corriendo http://localhost:" + PORT);
});

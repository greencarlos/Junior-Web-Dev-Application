const express = require("express");
const path = require("path");
const cors = require("cors");
const fetch = require("node-fetch");
const app = express();
const PORT = process.env.PORT || 3000;

console.log("fetch", fetch);

app.use(express.static("public"));
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/career_application", async (req, res, next) => {
  console.log("Received body:", JSON.stringify(req.body, null, 2));
  try {
    const remoteUrl = "https://windbornesystems.com/career_applications.json";
    const payload = req.body;

    const response = await fetch(remoteUrl, {
      method: "POST",
      headers: {
        "Content-Type": "applicaton/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    console.log("Remote response status:", response.status);
    const text = await response.text();
    console.log("Remote response body:", text);

    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).send(`Remote server error: ${text}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Proxy POST error:", err);
    res.status(500).send("Internal server error");
  }
});

app.get("/career_application", (req, res) => {
  res.send("<h1>Hello world!</h1>");
});

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.stack || err);
  res
    .status(500)
    .json({ error: "Internal Server Error", details: err.message });
});

app.listen(PORT, () => {
  console.log(`Proxy listening on http://localhost:${PORT}`);
});

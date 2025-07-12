
const express = require("express");
const ytdl = require("@distube/ytdl-core");
const cors = require("cors");
const app = express();
const PORT = 4000;

app.use(cors());

app.get("/download", async (req, res) => {
  const videoURL = req.query.url;
  if (!ytdl.validateURL(videoURL)) {
    return res.status(400).json({ error: "Invalid URL" });
  }

  const info = await ytdl.getInfo(videoURL);
  const title = info.videoDetails.title.replace(/[^a-zA-Z0-9]/g, "_");

  res.header("Content-Disposition", `attachment; filename="${title}.mp4"`);
  ytdl(videoURL, { format: "mp4" }).pipe(res);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
import express from "express";
import cron from "node-cron";
import findRemoveSync from "find-remove";
import { spotifyGetTrack, spotifyDownloadTrack } from "./utils/utils.cjs";
// import { dirname } from "path";
// const appDir = dirname(require.main.filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// define routes
app.get("/api/track-details", async (req, res) => {
  let { trackUrl } = req.query;
  try {
    return res.send(await spotifyGetTrack(trackUrl));
  } catch (err) {
    console.log("[ERROR]", err);
  }
});

app.get("/api/download", async (req, res) => {
  let { trackUrl } = req.query;
  try {
    return await res.download(await spotifyDownloadTrack(trackUrl));
  } catch (err) {
    console.log("[ERROR]", err);
  }
});

// cron
// reference: https://crontab.guru/
cron.schedule("0 6 * * *", () => {
  console.log(findRemoveSync(process.cwd(), { extensions: [".mp3"] }));
});

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      `[SUCCESS] Server is successfully running and listening on port ${PORT}.`
    );
  else console.log("[ERROR]", error);
});

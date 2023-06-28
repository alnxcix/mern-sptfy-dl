require("dotenv").config();

// ffmpeg setup
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(ffmpegPath);

// spotify setup
const Spotify = require("spotifydl-core").default;
const spotify = new Spotify({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

const spotifyGetTrack = async (trackUrl) => {
  try {
    return await spotify.getTrack(trackUrl);
  } catch (err) {
    console.log("[ERROR]", err);
  }
};

const spotifyGetAlbum = async (albumUrl) => {
  try {
    await spotify.getAlbum(albumUrl);
  } catch (err) {
    console.log("[ERROR]", err);
  }
};

const spotifyGetPlaylist = async (playlistUrl) => {
  try {
    await spotify.getPlaylist(playlistUrl);
  } catch (err) {
    console.log("[ERROR]", err);
  }
};

const spotifyDownloadTrack = async (trackUrl) => {
  try {
    let data = await spotifyGetTrack(trackUrl);
    return await spotify.downloadTrack(trackUrl, `${data.name}.mp3`);
  } catch (err) {
    console.log("[ERROR]", err);
  }
};

module.exports = { spotifyGetTrack, spotifyDownloadTrack };

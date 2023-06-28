import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { getTrack } from "./api/spotifyApi";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Track from "./components/dynamic/Track";

const App = () => {
  // states
  const [trackUrl, setTrackUrl] = useState(
    "https://open.spotify.com/track/5jQI2r1RdgtuT8S3iG8zFC?si=96a496cbf1ba4b4b"
  );
  const [tracks, setTracks] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (tracks.find((track) => track.trackUrl === trackUrl)) {
      toast.error("You already added this track.");
    } else {
      toast.info("Finding track.");
      try {
        let data = await getTrack({ trackUrl: trackUrl });
        setTracks([...tracks, { ...data, trackUrl: trackUrl }]);
        toast.success("Track found.");
      } catch (err) {
        console.log("[ERROR]", err);
        toast.error("An error occurred.");
      }
    }
  };

  const handleHasIncompleteFields = (e) => {
    e.preventDefault();
    toast.error("You must provide a valid Spotify link.");
  };

  const handleImport = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      setTracks(JSON.parse(e.target.result));
    };
  };

  return (
    <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
      <ToastContainer />
      <Header />
      <div className="flex-grow-1 p-5">
        {/* card with search bar */}
        <div className="card shadow mb-3">
          <div className="card-body">
            <div>
              <form
                onSubmit={
                  trackUrl.isEmpty ? handleHasIncompleteFields : handleSubmit
                }
              >
                <h6 className="mb-3">
                  Provide a link to a Spotify track here:
                </h6>
                <div className="d-flex justify-content-between">
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      className="form-control rounded-pill no-right-radius"
                      placeholder="Paste link to a Spotify track here..."
                      value={trackUrl}
                      onChange={(e) => setTrackUrl(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="btn rounded-pill themed-button no-left-radius"
                    >
                      Find track
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* card for track searches */}
        <div className="card shadow">
          <div className="card-body">
            <div className="align-items-center d-flex">
              <div className="flex-grow-1">
                <h6>
                  Saved tracks{" "}
                  <span className="badge" id="dl-badge">
                    {tracks.length}
                  </span>
                </h6>
              </div>

              {tracks.length >= 1 && (
                <a
                  className="btn rounded-pill themed-button"
                  type="button"
                  href={`data:text/json;charset=utf-8,${encodeURIComponent(
                    JSON.stringify(tracks)
                  )}`}
                  download="saved-tracks.json"
                >
                  Export
                </a>
              )}

              <label
                for="import-input"
                role="button"
                className="btn rounded-pill themed-button ms-1"
                type="button"
              >
                Import
              </label>

              <input
                id="import-input"
                className="d-none"
                type="file"
                onChange={handleImport}
              />
            </div>

            <hr />

            {tracks?.map((track, index) => (
              <Track
                track={track}
                index={index}
                tracks={tracks}
                setTracks={setTracks}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;

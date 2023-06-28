// track properties:
// album_name: string
// artists: [string]
// cover_url: string
// name: string
// release_date: string
// trackUrl: string

import { download } from "../../api/spotifyApi";
import { toast } from "react-toastify";

const Track = ({ track, index, tracks, setTracks }) => {
  const handleDownload = async () => {
    toast.info("Proccessing your track. Please wait...");
    try {
      saveBlobAsAudioFormat(await download({ trackUrl: track.trackUrl }));
      toast.success("Download started.");
    } catch (err) {
      console.log("[ERROR]", err);
      toast.error("An error occurred.");
    }
  };

  const saveBlobAsAudioFormat = (blob) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${track.name}.mp3`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleDelete = () => {
    setTracks(tracks.filter((_, i) => i !== index));
  };

  const isLast = () => {
    return index === tracks.length - 1;
  };

  return (
    <div
      className={`d-flex align-items-center ${
        !isLast() && "border-bottom mb-3 pb-3"
      }`}
    >
      <div className="flex-shrink-0">
        <img
          src={track.cover_url}
          className="rounded-3"
          style={{ width: "75px" }}
        />
      </div>
      <div className="flex-grow-1 ms-3">
        <div className="fw-bold">{track.name}</div>
        <div className="fw-light">
          by {track?.artists?.join(", ")},{" "}
          <span className="fw-lighter">{track.release_date}</span>
        </div>
      </div>
      <button
        type="button"
        className="btn themed-button rounded-pill"
        onClick={handleDownload}
      >
        Download
      </button>
      <button
        type="button"
        className="btn themed-button rounded-pill ms-1"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
};

export default Track;

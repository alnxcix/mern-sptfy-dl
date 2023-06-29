// track properties:
// album_name: string
// artists: [string]
// cover_url: string
// name: string
// release_date: string
// trackUrl: string

import { useState } from "react";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faTrash } from "@fortawesome/free-solid-svg-icons";
import { download } from "../../api/spotifyApi";

const Track = ({ track, index, tracks, setTracks }) => {
  // states
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDownload = async () => {
    setIsProcessing(true);
    toast.info("Processing track. Please wait...");
    try {
      saveBlobAsAudioFormat(await download({ trackUrl: track.trackUrl }));
      toast.success("Download started.");
    } catch (err) {
      console.log("[ERROR]", err);
      toast.error("An error occurred.");
    } finally {
      setIsProcessing(false);
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
          alt=""
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
        disabled={isProcessing}
      >
        {isProcessing ? (
          <div
            className="spinner-border spinner-border-sm mx-3"
            role="status"
          />
        ) : (
          <>
            <FontAwesomeIcon icon={faDownload} /> Download
          </>
        )}
      </button>
      <button
        type="button"
        className="btn themed-button rounded-pill ms-1"
        onClick={handleDelete}
      >
        <FontAwesomeIcon icon={faTrash} /> Delete
      </button>
    </div>
  );
};

export default Track;

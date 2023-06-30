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
import {
  faDownload,
  faTrash,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import { download } from "../../api/spotifyApi";
import moment from "moment";

const Track = ({ track, index, tracks, setTracks }) => {
  // states
  const [isProcessing, setIsProcessing] = useState(false);

  const parseDate = (dateString, targetFormat) => {
    return moment(dateString, "YYYY-MM-DD").format(targetFormat);
  };

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
          <span className="fw-lighter">
            {parseDate(track.release_date, "LL")}
          </span>
        </div>
      </div>

      <div class="dropdown">
        <button class="btn border-0" type="button" data-bs-toggle="dropdown">
          <FontAwesomeIcon icon={faEllipsisVertical} />
        </button>
        <ul class="dropdown-menu">
          <li>
            <button
              type="button"
              class="dropdown-item"
              onClick={handleDownload}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <div
                  className="spinner-border spinner-border-sm"
                  role="status"
                />
              ) : (
                <>
                  <FontAwesomeIcon icon={faDownload} /> Download
                </>
              )}
            </button>
          </li>
          <li>
            <button type="button" class="dropdown-item" onClick={handleDelete}>
              <FontAwesomeIcon icon={faTrash} /> Delete
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Track;

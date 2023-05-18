import { ContentCopy, OpenInNew } from "@mui/icons-material";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import "./UrlListItem.scss";

function UrlListItem({ id, fullUrl, url, getUrls }) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(fullUrl);

  const handleCopy = (url) => {
    navigator.clipboard.writeText(`http://localhost:5001/${url.shortUrl}`);
    toast.success("Copied to clipboard");
  };

  const handleUpdate = async () => {
    const response = await axios.patch(
      `http://localhost:5001/${url.shortUrl}`,
      {
        id,
        fullUrl: inputValue,
      }
    );

    if (response.status !== 200) {
      toast.error("An error occured while updating the URL");
      return setInputValue(fullUrl);
    }

    toast.success("URL updated successfully");
    setIsEditing(false);
    getUrls();
  };

  const openInNewTab = (url) => {
    const newWindow = window.open(
      `http://localhost:5001/${url.shortUrl}`,
      "_blank",
      "noopener,noreferrer"
    );
    if (newWindow) newWindow.opener = null;
  };

  return (
    <div className="row">
      {!isEditing ? (
        <div onClick={() => setIsEditing(true)}>
          <p>{fullUrl}</p>
        </div>
      ) : (
        <div>
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={handleUpdate}
          />
        </div>
      )}
      <div className="icons-container">
        <div title="Open in new tab">
          <OpenInNew
            onClick={() => openInNewTab(url)}
            className="open-icon icon"
          />
        </div>
        <div title="Copy to clipboard">
          <ContentCopy onClick={() => handleCopy(url)} className="icon" />
        </div>
        <div>Delete Icon</div>
      </div>
    </div>
  );
}

export default UrlListItem;

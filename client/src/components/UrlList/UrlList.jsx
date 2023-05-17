import { useEffect } from "react";
import { ContentCopy, OpenInNew } from "@mui/icons-material";
import { toast } from "react-hot-toast";
import "./UrlList.scss";

function UrlList({ urls, getUrls }) {
  const handleCopy = (url) => {
    navigator.clipboard.writeText(`http://localhost:5001/${url.shortUrl}`);
    toast.success("Copied to clipboard");
  };

  const openInNewTab = (url) => {
    const newWindow = window.open(
      `http://localhost:5001/${url.shortUrl}`,
      "_blank",
      "noopener,noreferrer"
    );
    if (newWindow) newWindow.opener = null;
  };

  useEffect(() => {
    getUrls();
  }, []);

  return (
    <>
      <h2 className="title">Your URLs</h2>
      <div>
        {urls.map((url) => (
          <div key={url._id} className="row">
            <div>
              <p>{url.fullUrl}</p>
            </div>
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
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default UrlList;

import { ContentCopy, OpenInNew } from "@mui/icons-material";
import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import "./App.css";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [urls, setUrls] = useState([]);

  const getUrls = async () => {
    const response = await fetch("http://localhost:5000/");
    const data = await response.json();
    setUrls(data);
  };

  const handleSubmit = async () => {
    await axios.post("http://localhost:5000/shortUrl", {
      fullUrl: inputValue,
    });

    setInputValue("");
    getUrls();
    toast.success("URL created successfully");
  };

  const handleCopy = (url) => {
    navigator.clipboard.writeText(`http://localhost:5000/${url.shortUrl}`);
    toast.success("Copied to clipboard");
  };

  const openInNewTab = (url) => {
    const newWindow = window.open(
      `http://localhost:5000/${url.shortUrl}`,
      "_blank",
      "noopener,noreferrer"
    );
    if (newWindow) newWindow.opener = null;
  };

  useEffect(() => {
    getUrls();
  }, []);

  return (
    <div className="container">
      <h1 className="title">URL shortner</h1>
      <p className="subtitle">
        Enter a URL to make it shorter. It will be saved in a database and you
        will be able to access it later. <br /> http:// will be added
        automatically.
      </p>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="input"
        placeholder="Enter a URL"
      />
      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={inputValue.length === 0}
      >
        Shorten
      </Button>
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
    </div>
  );
}

export default App;

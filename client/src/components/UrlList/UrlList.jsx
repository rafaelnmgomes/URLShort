import { useEffect } from "react";
import UrlListItem from "../UrlListItem/UrlListItem";
import "./UrlList.scss";

function UrlList({ urls, getUrls }) {
  useEffect(() => {
    getUrls();
  }, []);

  return (
    <>
      <h2 className="title">Your URLs</h2>
      <div>
        {urls.map((url) => (
          <UrlListItem
            key={url._id}
            id={url._id}
            fullUrl={url.fullUrl}
            url={url}
            getUrls={getUrls}
          />
        ))}
      </div>
    </>
  );
}

export default UrlList;

import { useState } from "react";
import { toast } from "react-hot-toast";
import Input from "../components/Input/Input";
import UrlList from "../components/UrlList/UrlList";
import "./Home.scss";

function Home() {
  const [urls, setUrls] = useState([]);

  const getUrls = async () => {
    const response = await fetch("http://localhost:5001/");
    if (response.status !== 200)
      return toast.error("An error occured while getting URLs");

    const data = await response.json();
    setUrls(data.reverse());
  };

  return (
    <div className="container">
      <h1 className="title">URL shortner</h1>
      <p className="subtitle">
        Enter a URL to make it shorter. It will be saved in a database and you
        will be able to access it later. <br /> http:// will be added
        automatically.
      </p>
      <Input getUrls={getUrls} />
      <UrlList urls={urls} getUrls={getUrls} />
    </div>
  );
}

export default Home;

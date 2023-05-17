import { Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import "./Input.scss";

function Input({ getUrls }) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = async () => {
    const response = await axios.post("http://localhost:5001/shortUrl", {
      fullUrl: inputValue,
    });

    if (response.status !== 201) {
      return toast.error("An error occured while creating the URL");
    }

    setInputValue("");
    getUrls();
    toast.success("URL created successfully");
  };

  return (
    <>
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
    </>
  );
}

export default Input;

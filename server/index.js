import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import ShortUrl from "./models/shortUrl.js";

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/", async (req, res) => {
  try {
    const shortUrls = await ShortUrl.find();
    res.status(200).json(shortUrls);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occured while fetching the urls" });
  }
});

app.post("/shortUrl", async (req, res) => {
  try {
    let fullUrl = req.body.fullUrl;
    if (!fullUrl) return res.status(400).json({ message: "Invalid URL" });

    if (!fullUrl.startsWith("http://") && !fullUrl.startsWith("https://")) {
      fullUrl = "http://" + fullUrl;
    }

    await ShortUrl.create({ fullUrl });
    res.status(201).json({ message: "ShortUrl created" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occured while creating the url" });
  }
});

app.get("/:shortUrl", async (req, res) => {
  try {
    const shortUrl = await ShortUrl.findOne({ shortUrl: req.params.shortUrl });
    if (shortUrl == null) return res.sendStatus(404);

    res.redirect(shortUrl.fullUrl);
  } catch (error) {
    res.status(500).json({ message: "An error occured" });
  }
});

app.patch("/:id", async (req, res) => {
  try {
    const filter = { _id: req.params.id };
    const updatedUrl = { fullUrl: req.body.fullUrl };

    await ShortUrl.updateOne(filter, updatedUrl).then((result) => {
      if (result.matchedCount === 0) {
        return res.status(404).json({ message: "Document not found" });
      }
      res.status(200).json({ message: "ShortUrl updated" });
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occured while updating the URL" });
  }
});

app.delete("/:id", async (req, res) => {
  try {
    const filter = { _id: req.params.id };

    await ShortUrl.deleteOne(filter).then((result) => {
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: "Document not found" });
      }
      res.status(200).json({ message: "ShortUrl deleted" });
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occured while deleting the URL" });
  }
});

app.listen(process.env.PORT || 5001, () => {
  console.log("Server is running on port 5001");
});

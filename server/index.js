import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import ShortUrl from "./models/shortUrl.js";

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://macielrafael1:CrO2askUSOqOcqZY@cluster0.yjgezwm.mongodb.net/test",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

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

app.listen(process.env.PORT || 5000, () => {
  console.log("Server is running on port 5000");
});
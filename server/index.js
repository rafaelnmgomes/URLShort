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

app.patch("/:shortUrl", async (req, res) => {
  try {
    const filter = { _id: req.body.id };
    const updatedUrl = { fullUrl: req.body.fullUrl };

    await ShortUrl.updateOne(filter, updatedUrl).then((result) => {
      if (result.matchedCount === 0) {
        return res.status(404).json({ message: "Document not found" });
      }
    });

    res.status(200).json({ message: "ShortUrl updated" });
  } catch (error) {
    console.log("🚀 ~ file: index.js:71 ~ app.patch ~ error:", error);
    res
      .status(500)
      .json({ message: "An error occured while updating the URL" });
  }
});

app.listen(process.env.PORT || 5001, () => {
  console.log("Server is running on port 5001");
});

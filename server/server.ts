import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Enable CORS for all routes

// Route to fetch trending songs from iTunes RSS feed
app.get("/api/trending", async (req, res) => {
  try {
    const response = await fetch(
      "https://itunes.apple.com/us/rss/topsongs/limit=10/json"
    );
    if (!response.ok) {
      throw new Error(
        `Error fetching data from iTunes API: ${response.statusText}`
      );
    }
    const data: any = await response.json();
    console.log(data); // Log the full response to inspect it
    res.json(data.feed.entry); // Assuming this is where the song data resides
  } catch (error) {
    console.error("Error fetching data from iTunes API:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch trending songs from iTunes API" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
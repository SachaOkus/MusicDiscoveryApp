import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Enable CORS for all routes

// Route to fetch data from the iTunes API
app.get("/api/search", async (req, res) => {
  const searchTerm = req.query.term || "radiohead"; // Default search term

  try {
    const response = await fetch(
      `https://itunes.apple.com/search?term=${searchTerm}&media=music&limit=10`
    );

    if (!response.ok) {
      throw new Error(
        `Error fetching data from iTunes API: ${response.statusText}`
      );
    }

    const data = await response.json();
    res.json(data); // Send the data back to the frontend
  } catch (error) {
    console.error("Error fetching data from iTunes API:", error);
    res.status(500).json({ error: "Failed to fetch data from iTunes API" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// URL for fetching top 10 songs using the iTunes RSS Feed
const API_URL = `https://itunes.apple.com/us/rss/topsongs/limit=10/json`;

export const fetchTrendingMusic = async () => {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data.feed.entry; // Return the list of top songs
  } catch (error) {
    console.error("Error fetching data from the iTunes API:", error);
    return [];
  }
};

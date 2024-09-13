// URL for fetching top 10 songs using the iTunes RSS Feed
const API_URL = `https://itunes.apple.com/us/rss/topsongs/limit=10/json`;

// iTunes search endpoint URL (modify according to actual API usage)
const ITUNES_SEARCH_API_URL = `https://itunes.apple.com/search`;

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

export const fetchItunesSearchResults = async (query: string) => {
  try {
    const response = await fetch(
      `${ITUNES_SEARCH_API_URL}?term=${query}&media=music`
    );
    if (!response.ok) {
      throw new Error(
        `Error fetching data from iTunes API: ${response.statusText}`
      );
    }
    const data = await response.json();
    return data.results; // Return search results
  } catch (error) {
    console.error("Error fetching iTunes search results:", error);
    return [];
  }
};

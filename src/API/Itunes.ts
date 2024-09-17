import { Track } from "../components/Types/types";

const API_URL = `https://itunes.apple.com/us/rss/topsongs/limit=10/json`;

const ITUNES_SEARCH_API_URL = `https://itunes.apple.com/search`;

export const fetchTrendingMusic = async () => {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data.feed.entry;
  } catch (error) {
    console.error("Error fetching data from the iTunes API:", error);
    return [];
  }
};

export const fetchItunesSearchResults = async (
  query: string
): Promise<Track[]> => {
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

    return data.results.map((item: any) => ({
      trackName: item.trackName,
      artistName: item.artistName,
      collectionName: item.collectionName,
      artworkUrl100: item.artworkUrl100,
      previewUrl: item.previewUrl,
      trackViewUrl: item.trackViewUrl,
    }));
  } catch (error) {
    console.error("Error fetching iTunes search results:", error);
    return [];
  }
};

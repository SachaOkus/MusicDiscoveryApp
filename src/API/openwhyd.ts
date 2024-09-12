const API_URL = "http://localhost:5000/api/playlists";

export const fetchTrendingPlaylists = async () => {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data; // Assuming the data structure is correct for playlists
  } catch (error) {
    console.error("Error fetching playlists from backend:", error);
    return [];
  }
};

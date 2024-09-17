const API_URL = "https://openwhyd.org/hot/hiphop?format=json";

export const fetchOpenwhydPlaylists = async (genre: string = "hiphop") => {
  try {
    const response = await fetch(`${API_URL}?genre=${genre}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching playlists from backend:", error);
    return [];
  }
};

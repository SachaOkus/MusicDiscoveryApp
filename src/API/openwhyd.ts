const API_URL = "http://localhost:5000/api/openwhyd_playlists";

export const fetchOpenwhydPlaylists = async (genre: string = "hiphop") => {
  try {
    const response = await fetch(`${API_URL}?genre=${genre}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    const data = await response.json();
    return data; // Adjust according to the structure of the Openwhyd response
  } catch (error) {
    console.error("Error fetching playlists from backend:", error);
    return [];
  }
};

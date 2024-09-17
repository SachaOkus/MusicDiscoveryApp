const API_URL = "http://localhost:5000/api/openwhyd_playlists";
// "https://openwhyd.org/hot/electro?format=json"

export const fetchOpenwhydPlaylists = async (genre: string = "hiphop") => {
  try {
    const response = await fetch(`${API_URL}?genre=${genre}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching playlists:", error);
    return [];
  }
};

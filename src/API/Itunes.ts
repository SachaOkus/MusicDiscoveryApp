const API_URL = "http://localhost:5000/api/search";

export const fetchMusicData = async (term: string) => {
  try {
    const response = await fetch(`${API_URL}?term=${term}`);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data.results; // iTunes returns data in the 'results' field
  } catch (error) {
    console.error("Error fetching data from backend:", error);
    return [];
  }
};

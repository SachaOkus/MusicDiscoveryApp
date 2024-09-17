const MUSICBRAINZ_API_URL = "https://musicbrainz.org/ws/2/artist";

export const fetchMusicBrainzArtist = async (artistId: string) => {
  try {
    const response = await fetch(`${MUSICBRAINZ_API_URL}/${artistId}?fmt=json`);
    if (!response.ok) {
      throw new Error(
        `Error fetching artist data from MusicBrainz: ${response.statusText}`
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching artist information from MusicBrainz:", error);
    return null;
  }
};

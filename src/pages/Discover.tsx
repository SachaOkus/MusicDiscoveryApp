import { useState } from "react";
import { fetchItunesSearchResults } from "../API/Itunes";
import { fetchMusicBrainzArtist } from "../API/musicbrainz";
import Modal from "../components/Modal/Modal";
import { Track } from "../components/Types/types";
import "./_discover.scss";

const Discover = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTerm, setFilterTerm] = useState("");
  const [selectedTrack, setSelectedTrack] = useState<any>(null);
  const [artistDetails, setArtistDetails] = useState<any>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm) return;
    try {
      setLoading(true);
      const data = await fetchItunesSearchResults(searchTerm);
      setTracks(data);
    } catch (err) {
      console.error("Error fetching tracks", err);
    } finally {
      setLoading(false);
    }
  };

  const handleTrackClick = async (track: any) => {
    setSelectedTrack(track);
    {
      selectedTrack && <div>Now Playing: {selectedTrack.trackName}</div>;
    }

    try {
      setLoading(true);
      const searchResponse = await fetch(
        `https://musicbrainz.org/ws/2/artist/?query=artist:${track.artistName}&fmt=json`
      );
      if (!searchResponse.ok) {
        throw new Error("Error fetching artist from MusicBrainz");
      }
      const searchData = await searchResponse.json();

      if (searchData.artists && searchData.artists.length > 0) {
        const artistId = searchData.artists[0].id;

        const artistData = await fetchMusicBrainzArtist(artistId);
        setArtistDetails(artistData);
        setModalOpen(true);
      } else {
        setArtistDetails({ error: "Artist not found" });
        setModalOpen(true);
      }
    } catch (err) {
      console.error("Error fetching artist details", err);
      setArtistDetails({ error: "Could not fetch artist details" });
      setModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setArtistDetails(null);
  };

  return (
    <div className="discover-container">
      <section className="search-bar">
        <div className="input-group">
          <label>Search for Tracks or Artist</label>
          <input
            type="text"
            placeholder="Enter track name or artist"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button onClick={handleSearch}>Search</button>

        <div className="filter-bar">
          <label>Filter by Name or Artist</label>
          <input
            type="text"
            placeholder="Filter by track name or artist"
            value={filterTerm}
            onChange={(e) => setFilterTerm(e.target.value)}
          />
        </div>
      </section>

      <section className="track-list">
        {loading ? (
          <p>Loading...</p>
        ) : (
          tracks
            .filter(
              (track) =>
                track.trackName
                  .toLowerCase()
                  .includes(filterTerm.toLowerCase()) ||
                track.artistName
                  .toLowerCase()
                  .includes(filterTerm.toLowerCase())
            )
            .map((track: Track, index: number) => (
              <div
                key={index}
                className="track-item"
                onClick={() => handleTrackClick(track)}
              >
                <img
                  src={track.artworkUrl100 || "https://via.placeholder.com/150"}
                  alt={track.trackName}
                />
                <h3>{track.trackName}</h3>
                <p>{track.artistName}</p>
              </div>
            ))
        )}
      </section>

      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          {loading ? (
            <p>Loading artist details...</p>
          ) : artistDetails && !artistDetails.error ? (
            <div className="artist-details">
              <h2>{artistDetails.name}</h2>
              <p>Name: {artistDetails["sort-name"] || "Not available"}</p>
              <p>Born: {artistDetails["life-span"]?.begin || "N/A"}</p>
              <p>
                Origin: {artistDetails["begin-area"]?.name || "Not available"}
              </p>
              <p>Country: {artistDetails.country || "Not available"}</p>
              <p>Gender: {artistDetails.gender || "Not available"}</p>
              <p>
                Description:{" "}
                {artistDetails.disambiguation || "No description available"}
              </p>

              {artistDetails.tags && artistDetails.tags.length > 0 ? (
                <p>
                  Genres:{" "}
                  {artistDetails.tags.map((tag: any) => tag.name).join(", ")}
                </p>
              ) : (
                <p>Genres: Not available</p>
              )}

              {artistDetails.relations && artistDetails.relations.length > 0 ? (
                <div>
                  <h4>Related Links:</h4>
                  <ul>
                    {artistDetails.relations.map(
                      (relation: any, index: number) => (
                        <li key={index}>
                          <a
                            href={relation.url.resource}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {relation.type}
                          </a>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              ) : (
                <p>No related links available</p>
              )}
            </div>
          ) : (
            <p>{artistDetails?.error || "Error loading artist details"}</p>
          )}
        </Modal>
      )}
    </div>
  );
};

export default Discover;

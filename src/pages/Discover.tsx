import React, { useState } from "react";
import { fetchItunesSearchResults } from "../API/Itunes"; // Use search function instead of trending
import { fetchMusicBrainzArtist } from "../API/musicbrainz"; // Import MusicBrainz API
import Modal from "../components/Modal/Modal"; // Modal component for showing artist details
import { Track } from "../components/Types/types";
import "./_discover.scss";

const Discover = () => {
  const [tracks, setTracks] = useState<Track[]>([]); // Ensure the type is Track[]
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [selectedTrack, setSelectedTrack] = useState<any>(null); // State for the selected track
  const [artistDetails, setArtistDetails] = useState<any>(null); // State for artist details
  const [isModalOpen, setModalOpen] = useState(false); // Modal visibility state

  // Fetch tracks from iTunes based on search term
  const handleSearch = async () => {
    if (!searchTerm) return; // Don't search if search term is empty
    try {
      const data = await fetchItunesSearchResults(searchTerm); // Use the correct search function
      setTracks(data);
    } catch (err) {
      console.error("Error fetching tracks", err);
    }
  };

  // Fetch artist data from MusicBrainz when a track is clicked
  const handleTrackClick = async (track: any) => {
    setSelectedTrack(track);

    // Search for the artist in MusicBrainz to get the MBID
    try {
      const searchResponse = await fetch(
        `https://musicbrainz.org/ws/2/artist/?query=artist:${track.artistName}&fmt=json`
      );
      if (!searchResponse.ok) {
        throw new Error("Error fetching artist from MusicBrainz");
      }
      const searchData = await searchResponse.json();

      if (searchData.artists && searchData.artists.length > 0) {
        const artistId = searchData.artists[0].id; // Get the first result's MBID

        // Fetch detailed artist data using the MBID
        const artistData = await fetchMusicBrainzArtist(artistId);
        setArtistDetails(artistData);
        setModalOpen(true); // Open the modal to show artist details
      } else {
        setArtistDetails({ error: "Artist not found" });
        setModalOpen(true); // Open the modal with the error
      }
    } catch (err) {
      console.error("Error fetching artist details", err);
      setArtistDetails({ error: "Could not fetch artist details" });
      setModalOpen(true);
    }
  };

  // Close the modal
  const handleCloseModal = () => {
    setModalOpen(false);
    setArtistDetails(null);
  };

  return (
    <div className="discover-container">
      {/* Search Bar */}
      <section className="search-bar">
        <input
          type="text"
          placeholder="Search for tracks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </section>

      {/* Track List */}
      <section className="track-list">
        {tracks.map((track: Track, index: number) => (
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
        ))}
      </section>

      {/* Modal for displaying artist details */}
      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          {artistDetails ? (
            <div className="artist-details">
              <h2>{artistDetails.name}</h2>
              <p>Sort Name: {artistDetails["sort-name"] || "Not available"}</p>
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
            <p>Loading artist details...</p>
          )}
        </Modal>
      )}
    </div>
  );
};

export default Discover;

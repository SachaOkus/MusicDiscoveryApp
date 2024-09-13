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

    // Use artist name from the track and search MusicBrainz for the artist
    const artistName = track.artistName;

    try {
      const artistData = await fetchMusicBrainzArtist(artistName); // Pass artistName to the MusicBrainz API
      setArtistDetails(artistData);
      setModalOpen(true); // Open the modal to show artist details
    } catch (err) {
      console.error("Error fetching artist details", err);
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
              <p>Born: {artistDetails.lifeSpan?.begin || "N/A"}</p>
              <p>Biography: {artistDetails.bio || "Biography not available"}</p>
              {/* Display other artist details as needed */}
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

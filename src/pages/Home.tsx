import React, { useEffect, useState } from "react";
import { fetchTrendingMusic } from "../API/Itunes"; // Function to fetch iTunes data
import { fetchOpenwhydPlaylists } from "../API/openwhyd"; // Function to fetch Openwhyd playlists
import { Track, Playlist } from "../components/Types/types"; // Import types
import "./_home.scss"; // Import the SCSS for styling

const Home = () => {
  const [tracks, setTracks] = useState<Track[]>([]); // State to store tracks data from iTunes
  const [playlists, setPlaylists] = useState<{
    hasMore: boolean;
    tracks: Playlist[];
  } | null>(null); // State to store playlists data from Openwhyd

  const [selectedGenre, setSelectedGenre] = useState<string>("hiphop"); // Default genre is hip-hop

  const [loadingTracks, setLoadingTracks] = useState<boolean>(true); // Loading state for tracks
  const [loadingPlaylists, setLoadingPlaylists] = useState<boolean>(true); // Loading state for playlists
  const [errorTracks, setErrorTracks] = useState<string | null>(null); // Error state for tracks
  const [errorPlaylists, setErrorPlaylists] = useState<string | null>(null); // Error state for playlists

  // Fetch trending tracks from iTunes
  useEffect(() => {
    const getTracks = async () => {
      try {
        const data = await fetchTrendingMusic();
        setTracks(data);
      } catch (err) {
        setErrorTracks("Failed to fetch tracks.");
      } finally {
        setLoadingTracks(false);
      }
    };
    getTracks();
  }, []);

  // Fetch trending playlists from Openwhyd based on selected genre
  useEffect(() => {
    const getPlaylists = async () => {
      try {
        const data = await fetchOpenwhydPlaylists(selectedGenre.toLowerCase()); // Ensure the genre is lowercase
        setPlaylists(data); // Set the full playlists object, including "tracks" array
      } catch (err) {
        setErrorPlaylists("Failed to fetch playlists.");
      } finally {
        setLoadingPlaylists(false);
      }
    };
    getPlaylists();
  }, [selectedGenre]); // Re-fetch playlists whenever the genre changes

  // Handle genre change
  const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newGenre = event.target.value.toLowerCase(); // Convert to lowercase
    setSelectedGenre(newGenre); // Update selected genre
    setLoadingPlaylists(true); // Set loading state for playlists
  };

  // Handle loading and error states for both APIs
  if (loadingTracks || loadingPlaylists) {
    return <div>Loading...</div>;
  }

  if (errorTracks || errorPlaylists) {
    return (
      <div>
        {errorTracks && <div>{errorTracks}</div>}
        {errorPlaylists && <div>{errorPlaylists}</div>}
      </div>
    );
  }

  return (
    <div className="home-container">
      {/* Featured Music Section */}
      <section className="featured-music">
        <h2>Featured Music</h2>
        <div className="track-list">
          {tracks.map((track: any, index: number) => (
            <div key={index} className="track-item">
              <img
                src={track["im:image"][2]?.label || ""}
                alt={track["im:name"]?.label || "Unknown track"}
                className="album-art"
              />
              <div>
                <h3>{track["im:name"]?.label || "Unknown track"}</h3>
                <p>Artist: {track["im:artist"]?.label || "Unknown artist"}</p>
                <audio controls>
                  <source
                    src={track.link[1]?.attributes.href || ""}
                    type="audio/mpeg"
                  />
                  Your browser does not support the audio element.
                </audio>
                <a
                  href={track.link[0]?.attributes.href || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="itunes-link"
                >
                  Buy on iTunes
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Genre Selector */}
      <section className="genre-selector">
        <h2>Select Genre</h2>
        <select value={selectedGenre} onChange={handleGenreChange}>
          <option value="hiphop">Hip Hop</option>
          <option value="electro">Electro</option>
          <option value="pop">Pop</option>
          <option value="rock">Rock</option>
          <option value="jazz">Jazz</option>
          {/* Add more genres as needed */}
        </select>
      </section>

      {/* Trending Playlists Section */}
      <section className="trending-playlists">
        <h2>Trending Playlist ({selectedGenre})</h2>
        <div className="playlist-list">
          {playlists?.tracks?.length ? (
            playlists.tracks.map((playlist: any, index: number) => (
              <div key={index} className="playlist-item">
                <img
                  src={
                    playlist.img || "https://via.placeholder.com/150" // Use the correct 'img' field from the API response
                  }
                  alt={playlist.name || "Unknown playlist"}
                  className="playlist-cover"
                />
                <div>
                  <h3>{playlist.name || "Unknown playlist"}</h3>
                  <p>Created by: {playlist.uNm || "Unknown owner"}</p>{" "}
                  {/* Use 'uNm' for owner */}
                  <a
                    href={playlist.trackUrl || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="listen-link"
                  >
                    Listen to Song
                  </a>
                </div>
              </div>
            ))
          ) : (
            <p>No playlists available.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;

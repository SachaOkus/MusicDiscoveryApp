import React, { useEffect, useState } from "react";
import { fetchMusicData } from "../API/Itunes"; // Import the new function from your backend API service
import { Track } from "../components/Types/types"; // Import the Track type if you have one
import "./_home.scss"; // Assuming you have a separate SCSS file for styling

const Home = () => {
  const [tracks, setTracks] = useState<Track[]>([]); // Update to store tracks instead of playlists
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getTracks = async () => {
      try {
        // Fetch music data from the backend (your server.js fetching from iTunes)
        const data = await fetchMusicData("radiohead"); // You can change the default search term if needed
        setTracks(data);
      } catch (err) {
        setError("Failed to fetch tracks.");
      } finally {
        setLoading(false);
      }
    };

    getTracks();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="home-container">
      {/* Featured Music Section */}
      <section className="featured-music">
        <h2>Featured Music</h2>
        <div className="track-list">
          {tracks.map((track: Track, index: number) => (
            <div key={index} className="track-item">
              <img src={track.artworkUrl100} alt={track.trackName} />
              <div>
                <h3>{track.trackName}</h3>
                <p>Artist: {track.artistName}</p>
                <p>Album: {track.collectionName}</p>
                <audio controls>
                  <source src={track.previewUrl} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
                <a
                  href={track.trackViewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Buy on iTunes
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Playlists Section */}
      <section className="trending-playlists">
        <h2>Trending Playlists</h2>
        {/* For now, this can be static or pulled from another API */}
        <div className="playlist-list">
          <div className="playlist-item">
            <img src="https://via.placeholder.com/100" alt="Playlist Name" />
            <div>
              <h3>Playlist Name</h3>
              <p>Created by User X</p>
            </div>
          </div>
          <div className="playlist-item">
            <img src="https://via.placeholder.com/100" alt="Playlist Name" />
            <div>
              <h3>Another Playlist</h3>
              <p>Created by User Y</p>
            </div>
          </div>
          {/* Repeat similar blocks for more playlists */}
        </div>
      </section>
    </div>
  );
};

export default Home;

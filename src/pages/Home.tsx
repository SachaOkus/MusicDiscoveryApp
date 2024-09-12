import React, { useEffect, useState } from "react";
import { fetchTrendingMusic } from "../API/Itunes"; // Import the function to fetch iTunes data
import { Track } from "../components/Types/types"; // Import the Track type
import "./_home.scss"; // Assuming you have a separate SCSS file for styling

const Home = () => {
  const [tracks, setTracks] = useState<Track[]>([]); // State to store tracks data
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    const getTracks = async () => {
      try {
        // Fetch music data from the backend (your server.js fetching from iTunes)
        const data = await fetchTrendingMusic(); // You can change the default search term
        console.log("Fetched tracks:", data); // Log the data for debugging
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
          {tracks.map((track: any, index: number) => (
            <div key={index} className="track-item">
              {/* Display album artwork */}
              <img
                src={track["im:image"][2].label} // 2 gives the largest image size
                alt={track["im:name"].label} // Track name
                className="album-art"
              />
              <div>
                <h3>{track["im:name"].label}</h3> {/* Track name */}
                <p>Artist: {track["im:artist"].label}</p> {/* Artist name */}
                <p>Album: {track["im:collection"].label}</p> {/* Album name */}
                <audio controls>
                  <source
                    src={track.link[1].attributes.href} // Preview URL
                    type="audio/mpeg"
                  />
                  Your browser does not support the audio element.
                </audio>
                <a
                  href={track.link[0].attributes.href} // iTunes link
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
    </div>
  );
};

export default Home;

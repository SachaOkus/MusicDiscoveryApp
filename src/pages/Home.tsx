import React, { useEffect, useState } from "react";
import { fetchTrendingMusic } from "../API/Itunes";
import { fetchOpenwhydPlaylists } from "../API/openwhyd";
import { Track, Playlist } from "../components/Types/types";
import "./_home.scss";

const Home = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [playlists, setPlaylists] = useState<{
    hasMore: boolean;
    tracks: Playlist[];
  } | null>(null);

  const [selectedGenre, setSelectedGenre] = useState<string>("hiphop");

  const [loadingTracks, setLoadingTracks] = useState<boolean>(true);
  const [loadingPlaylists, setLoadingPlaylists] = useState<boolean>(true);
  const [errorTracks, setErrorTracks] = useState<string | null>(null);
  const [errorPlaylists, setErrorPlaylists] = useState<string | null>(null);

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

  useEffect(() => {
    const getPlaylists = async () => {
      try {
        const data = await fetchOpenwhydPlaylists(selectedGenre.toLowerCase());
        setPlaylists(data);
      } catch (err) {
        setErrorPlaylists("Failed to fetch playlists.");
      } finally {
        setLoadingPlaylists(false);
      }
    };
    getPlaylists();
  }, [selectedGenre]);

  const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newGenre = event.target.value.toLowerCase();
    setSelectedGenre(newGenre);
    setLoadingPlaylists(true);
  };

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

      <section className="genre-selector">
        <h2>Select Genre</h2>
        <select value={selectedGenre} onChange={handleGenreChange}>
          <option value="hiphop">Hip Hop</option>
          <option value="electro">Electro</option>
          <option value="pop">Pop</option>
          <option value="rock">Rock</option>
          <option value="jazz">Jazz</option>
        </select>
      </section>

      <section className="trending-playlists">
        <h2>Trending Playlist ({selectedGenre})</h2>
        <div className="playlist-list">
          {playlists?.tracks?.length ? (
            playlists.tracks.map((playlist: any, index: number) => (
              <div key={index} className="playlist-item">
                <img
                  src={playlist.img || "https://via.placeholder.com/150"}
                  alt={playlist.name || "Unknown playlist"}
                  className="playlist-cover"
                />
                <div>
                  <h3>{playlist.name || "Unknown playlist"}</h3>
                  <p>Created by: {playlist.uNm || "Unknown owner"}</p>{" "}
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

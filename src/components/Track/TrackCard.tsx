import React from "react";

const TrackCard = ({ track, onClick }: any) => (
  <div className="track-item" onClick={() => onClick(track)}>
    <img src={track.artworkUrl100} alt={track.trackName} />
    <h3>{track.trackName}</h3>
    <p>{track.artistName}</p>
  </div>
);

export default TrackCard;

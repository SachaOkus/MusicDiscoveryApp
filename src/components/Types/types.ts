// Define a type for a track
export interface Track {
  name: string;
  eId: string; // Track URL (can be embedded)
  trackName: string;
  artistName: string;
  collectionName: string;
  artworkUrl100: string;
  previewUrl: string;
  trackViewUrl: string;
}

// Define a type for a playlist
export interface Playlist {
  _id: string;
  name: string;
  owner: {
    name: string;
  };
  tracks: Track[];
}

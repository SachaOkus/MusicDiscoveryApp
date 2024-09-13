// Define a type for a track
// Define a type for a track (iTunes API structure)
export interface Track {
  trackName: string; // Name of the track
  artistName: string; // Name of the artist
  collectionName: string; // Name of the album/collection
  artworkUrl100: string; // URL for the track's artwork
  previewUrl: string; // URL to preview the track
  trackViewUrl: string; // URL to the track on iTunes (for purchase)
}

// Define a type for the owner of a playlist
interface PlaylistOwner {
  name: string; // Name of the playlist's creator
}

// Define a type for a playlist
export interface Playlist {
  name: string; // Name of the playlist
  imgUrl: string; // URL of the playlist image
  owner: PlaylistOwner; // Owner of the playlist
  url: string; // URL to access the playlist
}

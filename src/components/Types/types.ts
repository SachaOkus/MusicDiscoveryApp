export interface Track {
  trackName: string;
  artistName: string;
  collectionName: string;
  artworkUrl100: string;
  previewUrl: string;
  trackViewUrl: string;
}

interface PlaylistOwner {
  name: string;
}

export interface Playlist {
  name: string;
  imgUrl: string;
  owner: PlaylistOwner;
  url: string;
}

# Music Discovery App

## Overview

The Music Discovery App allows users to explore music using iTunes, MusicBrainz, and Openwhyd APIs. Users can search for tracks, view detailed artist/album information, and interact with curated playlists.

## Features

- **Home**: Display featured tracks from iTunes.
- **Discover**: Search for songs using iTunes, enriched with metadata from MusicBrainz, and explore curated playlists from Openwhyd.
- **Track Details**: View detailed track and artist information.
- **Playlists**: Explore curated playlists and interact with them.

## UI Layout

- **Header**: Contains navigation links for Home and Discover.
- **Main Section**: Displays featured music and search results.
- **Styling**: SCSS is used for the overall styling.

## Routing Setup

- **Home Route** (/): Displays trending tracks from iTunes.
- **Discover Route** (/discover): Search functionality using iTunes and additional metadata from MusicBrainz.
- **Track Details Route** (/track/:id): Detailed view using iTunes, MusicBrainz, and Openwhyd.

## API Integrations

- **iTunes API**: Fetch track previews, album artwork, and links to iTunes.
- **MusicBrainz API**: Fetch detailed artist information and album metadata.
- **Openwhyd API**: Display curated playlists for discovery.

## Component Structure

- **App Component**: Manages layout and routing.
- **Home Component**: Displays featured music using the iTunes API.
- **Discover Component**: Handles search and displays results from iTunes and MusicBrainz.
- **Track Details Component**: Provides detailed track and artist info.
- **SearchBar Component**: Search functionality using the iTunes API.

## State Management

useState and useEffect are used to manage API calls and the app’s state.

## API Call Logic

- **Search Music (iTunes + MusicBrainz)**: Search for songs via iTunes, fetch additional artist/album metadata from MusicBrainz.
- **Playlists (Openwhyd)**: Display curated playlists for user exploration.

## Enhancements (Optional)

- **Dark Mode**: Add a toggle for dark mode.
- **Favourites**: Allow users to favorite tracks and playlists using local storage or a backend like Firebase.

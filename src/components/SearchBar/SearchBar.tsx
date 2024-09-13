import React, { useState } from "react";
import { fetchItunesSearchResults } from "../../API/Itunes"; // Assuming the API fetch function is here

interface SearchBarProps {
  onSearch: (results: any[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Fetch the search results from iTunes API
    const results = await fetchItunesSearchResults(query);
    onSearch(results);
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        value={query}
        placeholder="Search for tracks..."
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;

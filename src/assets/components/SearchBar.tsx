import React, { useState } from 'react';

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearch = () => {
    console.log(`Searching for ${searchTerm}`);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for medications..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchBar;

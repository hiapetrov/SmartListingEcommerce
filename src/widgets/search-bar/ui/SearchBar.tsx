import React, { useState } from 'react';
import { SearchIcon } from '../../../shared/lib/icons';

export const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search for:', searchQuery);
    // In a real application, this would trigger a search
  };
  
  return (
    <form onSubmit={handleSearch} className="relative">
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full bg-gray-800 bg-opacity-50 backdrop-blur-sm text-white placeholder-gray-400 rounded-lg px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 border border-gray-700"
      />
      <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
    </form>
  );
};

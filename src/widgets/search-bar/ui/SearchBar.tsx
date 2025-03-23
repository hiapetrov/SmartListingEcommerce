import React, { useState } from 'react';
import { SearchIcon } from '../../../shared/lib/icons';
import { 
  searchBarContainer, 
  searchInput, 
  searchIconContainer 
} from './search-bar.css';

export interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch,
  placeholder = 'Search...'
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };
  
  return (
    <form onSubmit={handleSearch} className={searchBarContainer}>
      <input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className={searchInput}
      />
      <div className={searchIconContainer}>
        <SearchIcon className="h-5 w-5" />
      </div>
    </form>
  );
};
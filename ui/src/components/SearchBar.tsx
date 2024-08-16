import React, { ChangeEvent } from 'react';

interface SearchBarProps {
    query: string;
    onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ query, onSearch }) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onSearch(event.target.value);
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search Pokémon..."
                value={query}
                onChange={handleChange}
            />
        </div>
    );
};

export default SearchBar;

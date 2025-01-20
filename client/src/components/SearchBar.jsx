import React from 'react';
import '../styles/SearchBar.css';

const SearchBar = ({ onSearch, onFilter }) => {
    return (
        <div className="search-bar">
            <input type="text" placeholder="Search for a country..." onChange={(e) => onSearch(e)} />
            <select onChange={(e) => onFilter(e)}>
                <option value="">Filter by Region</option>
                <option value="Africa">Africa</option>
                <option value="Americas">Americas</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
            </select>
        </div>
    );
};

export default SearchBar;

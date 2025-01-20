import React, { useState, useEffect } from 'react';
import { fetchCountries } from '../api';
import CountryCard from '../components/CountryCard';
import SearchBar from '../components/SearchBar';
import '../styles/Home.css';

const HomePage = ({ theme }) => {
    const [countries, setCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const loadCountries = async () => {
            try {
                const data = await fetchCountries();
                setCountries(data);
                setFilteredCountries(data);
            } catch (error) {
                console.error('Failed to fetch countries:', error);
            }
        };
        loadCountries();
    }, []);

    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchTerm(query);
        setFilteredCountries(countries.filter(country =>
            country.name.toLowerCase().includes(query)
        ));
    };

    const handleFilter = (event) => {
        const selectedRegion = event.target.value;
        if (selectedRegion === "") {
            setFilteredCountries(countries);
        } else {
            setFilteredCountries(countries.filter(country => country.region === selectedRegion));
        }
    };

    return (
        <div>
            <SearchBar onSearch={handleSearch} onFilter={handleFilter} />
            <div className="countries-list">
                {filteredCountries.length > 0 ? (
                    filteredCountries.map(country => (
                        <CountryCard key={country.name} country={country} theme={theme} />
                    ))
                ) : (
                    <p>No countries found</p>
                )}
            </div>
        </div>
    );
};

export default HomePage;

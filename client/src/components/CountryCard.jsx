import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/CountryCard.css';

const CountryCard = ({ country, theme }) => {
    return (
        <Link to={`/country/${country.name}`} className={`country-card ${theme}`}>
            <img src={country.flag_url} alt={`${country.name} flag`} className="country-flag" />
            <div className="country-info">
                <h3>{country.name}</h3>
                <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
                <p><strong>Region:</strong> {country.region}</p>
                <p><strong>Capital:</strong> {country.capital}</p>
            </div>
        </Link>
    );
};

export default CountryCard;

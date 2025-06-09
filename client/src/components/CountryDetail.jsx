import React from 'react';


const CountryDetail = ({ country, theme }) => {
    return (
        <div className={`details ${theme}`}>
            <h2>{country.name}</h2>
            <img src={country.flag_url} alt={`${country.name} flag`} />
            <p>Population: {country.population.toLocaleString()}</p>
            <p>Region: {country.region}</p>
            <p>Capital: {country.capital}</p>
            <p>Border Countries: {country.borders.join(',') || 'None'}</p>
        </div>
    );
};

export default CountryDetail;
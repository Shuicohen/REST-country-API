import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchCountryDetails } from '../api';
import '../styles/DetailPage.css';

const DetailPage = ({ theme }) => {
    const { name } = useParams();
    const [country, setCountry] = useState(null);

    useEffect(() => {
        const loadCountryDetails = async () => {
            try {
                const data = await fetchCountryDetails(name);
                if (data) {
                    setCountry(data);
                }
            } catch (error) {
                console.error('Failed to fetch country details:', error);
            }
        };
        loadCountryDetails();
    }, [name]);

    if (!country) {
        return <p>Loading country details...</p>;
    }

    return (
        <div className={`detail-page ${theme}`}>
            <Link to="/" className="back-button">← Back</Link>
            <div className="detail-container">
                <img src={country.flag_url} alt={`${country.name} flag`} className="detail-flag" />
                <div className="detail-info">
                    <h1>{country.name}</h1>
                    <p><strong>Native Name:</strong> {country.nativeName || "Not Available"}</p>
                    <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
                    <p><strong>Region:</strong> {country.region}</p>
                    <p><strong>Subregion:</strong> {country.subregion || "Not Available"}</p>
                    <p><strong>Capital:</strong> {country.capital || "Not Available"}</p>
                    <p><strong>Top Level Domain:</strong> {country.topLevelDomain?.join(', ') || "Not Available"}</p>
                    <p><strong>Currencies:</strong> {country.currencies?.map(c => c.name).join(', ') || "Not Available"}</p>
                    <p><strong>Languages:</strong> {country.languages?.map(l => l.name).join(', ') || "Not Available"}</p>
                    <p><strong>Borders:</strong> {country.borders?.join(', ') || "None"}</p>
                </div>
            </div>
        </div>
    );
};

export default DetailPage;

const axios = require('axios');
const db = require('../db');
const fs = require('fs');
const path = require('path');

const fetchCountries = async (req, res) => {
    try {
        console.log('Fetching countries from API...');

        const { data } = await axios.get('https://restcountries.com/v2/all', {
            timeout: 15000,
        });

        // Debug: Print a sample API response
        console.log("Sample Country:", data[0]);

        const formattedData = data.map((country) => {
            let flagUrl = "https://via.placeholder.com/150"; // Default placeholder

            if (country.flags) {
                if (typeof country.flags === "string") {
                    flagUrl = country.flags; // Handle special case like Taliban flag
                } else if (country.flags.png) {
                    flagUrl = country.flags.png; // Handle normal flags
                }
            }

            return {
                name: country.name || "Unknown",
                population: country.population || 0,
                region: country.region || "N/A",
                capital: country.capital || "N/A",
                flag_url: flagUrl, // Safe check for all flag formats
                borders: Array.isArray(country.borders) ? country.borders : [], // Ensure it's an array
            };
        });

        console.log('Saving data to database...');

        await db('countries').del(); // Clear old data

        const inserted = await db('countries').insert(formattedData).returning('*');

        console.log('Countries saved successfully:', inserted.length);
        res.status(200).json({ message: 'Countries saved successfully' });
    } catch (error) {
        console.error('Error fetching countries:', error.message);
        res.status(500).json({ error: 'Failed to fetch countries' });
    }
};

// Get all countries from database
const getAllCountries = async (req, res) => {
    try {
        let countries = await db.select('*').from('countries');

        if (!countries.length) {
            const dataPath = path.join(__dirname, 'data.json');
            const jsonData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
            countries = jsonData;
        }

        res.json(countries);
    } catch (error) {
        console.error('Error fetching countries:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get country details
const getCountryDetails = async (req, res) => {
    const { name } = req.params;

    try {
        let country = await db('countries').where({ name }).first();

        const dataPath = path.join(__dirname, '../data.json');
        const jsonData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

        // Find additional details from data.json
        const extraInfo = jsonData.find((c) => c.name.toLowerCase() === name.toLowerCase());

        if (extraInfo) {
            country = {
                ...country,
                nativeName: extraInfo.nativeName || "Not Available",
                subregion: extraInfo.subregion || "Not Available",
                topLevelDomain: extraInfo.topLevelDomain || ["Not Available"],
                currencies: extraInfo.currencies || [{ name: "Not Available" }],
                languages: extraInfo.languages || [{ name: "Not Available" }],
            };
        }

        if (!country) {
            return res.status(404).json({ message: 'Country not found' });
        }

        res.json(country);
    } catch (error) {
        console.error('Error fetching country:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports = {
    fetchCountries,
    getAllCountries,
    getCountryDetails,
};
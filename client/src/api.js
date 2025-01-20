import axios from 'axios';

const API_BASE_URL = 'https://rest-country-api-czr2.onrender.com/api/countries';

export const fetchCountries = async () => {
    try {
        const response = await axios.get(API_BASE_URL);
        return response.data;
    } catch (error) {
        console.error('API Error fetching countries:', error);
        return [];
    }
};

export const fetchCountryDetails = async (name) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${name}`);
        return response.data;
    } catch (error) {
        console.error(`API Error fetching country details for ${name}:`, error);
        return null;
    }
};

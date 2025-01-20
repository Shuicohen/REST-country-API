const express = require('express');
const { fetchCountries, getAllCountries, getCountryDetails } = require('../controllers/countryController');

const router = express.Router();

router.get('/fetch', fetchCountries);
router.get('/', getAllCountries);
router.get('/:name', getCountryDetails);

module.exports = router;
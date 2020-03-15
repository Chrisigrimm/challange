module.exports = {
    init: () => {
        // env
        require('dotenv').config();

        const { WIKI_BASE_URL, HTTP_RETRIES } = process.env;

        const axios = require('axios');
        axios.defaults.baseURL = WIKI_BASE_URL;

        const axiosRetry = require('axios-retry');
        axiosRetry(axios, { retries: HTTP_RETRIES });

        return {
            axios
        }
    }
}
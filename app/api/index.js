const http = require('http');
const carModel = require('../database/car.model');

module.exports = async () => {
    const { API_PORT, API_HOSTNAME } = process.env;

    const hostname = API_HOSTNAME;
    const port = API_PORT;

    const server = http.createServer(async (req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        
        const cars = await carModel.find({},'name topTenWords -_id').exec();
        
        res.end(JSON.stringify(cars));
    });

    server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
    });
}
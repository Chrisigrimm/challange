const main = async () => {
    // init
    require('./app/lib/threadHelper').init();
    await require('./app/database').init();
    await require('./app/api')();

    const carCrawler = require('./app/crawler/car.crawler');
    carCrawler(1000);
}

main();
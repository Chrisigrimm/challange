const main = async () => {
    // init
    require('./app/lib/threadHelper').init();
    await require('./app/database').init();
    await require('./app/api')();

    require('./app/crawler/car.crawler')();
}

main();
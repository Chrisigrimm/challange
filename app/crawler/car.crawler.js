
module.exports = async () => {
    const { start, job } = require("microjob");
    const { getUri } = require('./../database')
    try {
        await start({ maxWorkers: 1 }); 

        const res = await job(async (jobData) => {
            const { axios } = require('./app/lib/threadHelper').init();
            await require('./app/database').initMongoose(jobData.mongodUri);
            const cheerio = require('cheerio');
            const carModel = require('./app/database/car.model');
            const _ = require('lodash');

            const { data } = await axios.get('/wiki/List_of_automobile_sales_by_model');

            if (!data) {
                throw new Error('No car data');
            }

            const $carModels = cheerio.load(data);
            const cars = [];
            $carModels('.wikitable tr > th a')
                .each((index, element) => {

                    try {
                        const name = $carModels(element).text().trim();
                        const href = $carModels(element).attr('href');

                        cars.push({
                            name,
                            href
                        });

                    } catch (error) {
                        console.error(error);
                    };
                })

            for (const { name, href } of cars) {
                // get article
                if (href) {
                    try {
                        const { data } = await axios.get(href);

                        if (!data) {
                            throw new Error('No car article data');
                        }

                        const $carModelArticle = cheerio.load(data);
                        const articleText = $carModelArticle('#mw-content-text').text()
                        if (articleText) {
                            const wordArray = articleText.trim().split(" ");

                            const { mostFrequentWords } = require('./app/lib/helperFunctions')

                            const topTenWords = mostFrequentWords(wordArray, 10).map((mostWords) => mostWords.word);

                            let car = await carModel.findOne({ name });

                            if (!car) {
                                car = await carModel.create({
                                    name,
                                    topTenWords
                                })
                            } else {
                                car.topTenWords = topTenWords;
                                await car.save();
                            }
                        }
                    } catch (error) {
                        console.error(error);
                    }
                }
            }

            return;
        }, {
            data: {
                mongodUri: await getUri()
            }
        });

        console.log(res);
    } catch (err) {
        console.error(err);
    }
}
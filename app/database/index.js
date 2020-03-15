const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const carModel = require('./car.model');

const mongod = new MongoMemoryServer();

const getUri = async () => {
    return await mongod.getUri();
};

const initMongoose = async (mongodUri) => {
    mongoose.set('useCreateIndex', true);
    await mongoose.connect(mongodUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
};

const init = async () => {
    const mongodUri = await getUri();

    if (!mongodUri) {
        throw new Error('No Database');
    }

    await initMongoose(mongodUri);

    // test data
    // await carModel.create(
    //     [{
    //         name: "EVO X"
    //     }, {
    //         name: "Ford ST"
    //     }])
}

module.exports = {
    init,
    initMongoose,
    getUri
}
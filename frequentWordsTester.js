const fs = require('fs');

const algoTestLoremFileName = './algoTestLorem.txt';

let loremWords = '';
// check if file exists
try {
    loremWords = fs.readFileSync(algoTestLoremFileName, 'utf8');
    console.log('lorem test file exists')
} catch (error) {
    //create file if not
    console.log('lorem test file created')
    const LoremIpsum = require("lorem-ipsum").LoremIpsum;
    const lorem = new LoremIpsum();
    loremWords = lorem.generateWords(100000)
    fs.writeFileSync(algoTestLoremFileName, loremWords);
}

if (loremWords) {
    const wordArray = loremWords.split(' ');
    const { mostFrequentWords,
        mostFrequentWordsOld,
        mostFrequentWordsObject
    } = require('./app/lib/helperFunctions');
    let output;

    console.log('####MAP#####');

    for (let i = 0; i < 10; i++) {
        console.time('TOTAL');
        output = mostFrequentWords(wordArray, 10);
        console.timeEnd('TOTAL');
    }

    console.log(output);
    console.log('####OBJECT#####');

    for (let i = 0; i < 10; i++) {
        console.time('TOTAL');
        output = mostFrequentWordsObject(wordArray, 10);
        console.timeEnd('TOTAL');
    }

    console.log(output);
    console.log('####OLD#####');

    for (let i = 0; i < 10; i++) {
        console.time('TOTAL');
        output = mostFrequentWordsOld(wordArray, 10);
        console.timeEnd('TOTAL');
    }

    console.log(output);
}

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
    const { 
        mostFrequentWordsQuickSort,
        mostFrequentWords,
        mostFrequentWordsReduce,
        mostFrequentWordsOld,
        mostFrequentWordsObject
    } = require('./app/lib/helperFunctions');

    const testFunction = (sortFunc) => {
        let output;
        for (let i = 1; i <= 50; i++) {
            output = sortFunc(wordArray, 10);
        }
        return output;
    }

    console.log('####MAP_QUICKSORT#####');
    console.time('TOTAL');
    console.log(testFunction(mostFrequentWordsQuickSort));
    console.timeEnd('TOTAL');

    console.log('####MAP_REDUCE#####');
    console.time('TOTAL');
    console.log(testFunction(mostFrequentWordsReduce))
    console.timeEnd('TOTAL');

    console.log('####MAP#####');
    console.time('TOTAL');
    console.log(testFunction(mostFrequentWords))
    console.timeEnd('TOTAL');
}

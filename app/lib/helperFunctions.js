module.exports = {
    mostFrequentWords: (wordsArray, ammount) => {
        let wordOccurrences = {};
        for (var i = 0; i < wordsArray.length; i++) {
            wordOccurrences['_' + wordsArray[i]] = (wordOccurrences['_' + wordsArray[i]] || 0) + 1;
        }
        let result = Object.keys(wordOccurrences).reduce(function (acc, currentKey) {
            for (var i = 0; i < ammount; i++) {
                if (!acc[i]) {
                    acc[i] = { word: currentKey.slice(1, currentKey.length), occurences: wordOccurrences[currentKey] };
                    break;
                } else if (acc[i].occurences < wordOccurrences[currentKey]) {
                    acc.splice(i, 0, { word: currentKey.slice(1, currentKey.length), occurences: wordOccurrences[currentKey] });
                    if (acc.length > ammount)
                        acc.pop();
                    break;
                }
            }
            return acc;
        }, []);
        return result;
    }
}
module.exports = {
    mostFrequentWordsOld: (wordsArray, ammount) => {
        let wordOccurrences = {};
        for (var i = 0; i < wordsArray.length; i++) {
            if (wordsArray[i] !== '') {
                wordOccurrences['_' + wordsArray[i]] = (wordOccurrences['_' + wordsArray[i]] || 0) + 1;
            }
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
    },
    mostFrequentWordsObject: (wordsArray, amount) => {
        let wordOccurrences = {};
        for (var i = 0; i < wordsArray.length; i++) {
            if (wordsArray[i] !== '') {
                wordOccurrences['_' + wordsArray[i]] = (wordOccurrences['_' + wordsArray[i]] || 0) + 1;
            }
        }

        return Object.entries(wordOccurrences)
            .sort((a, b) => b[1] - a[1])
            .slice(0, amount);
    },
    mostFrequentWords: (wordsArray, amount) => {
        let wordOccurrences = new Map();
        const wordsArrayLength = wordsArray.length;

        for (var i = 0; i < wordsArrayLength; i++) {
            if (wordsArray[i] !== '') {
                wordOccurrences.set(wordsArray[i], (wordOccurrences.get(wordsArray[i]) || 0) + 1);
            }
        }

        // V8 Sort is default QuickSort if more then 10 entries so O(log(n)) 
        return Array.from(wordOccurrences)
            .sort((a, b) => b[1] - a[1])
            .slice(0, amount);
    },
    mostFrequentWordsQuickSort: (wordsArray, amount) => {
        let wordOccurrences = new Map();
        const wordsArrayLength = wordsArray.length;

        for (var i = 0; i < wordsArrayLength; i++) {
            if (wordsArray[i] !== '') {
                wordOccurrences.set(wordsArray[i], (wordOccurrences.get(wordsArray[i]) || 0) + 1);
            }
        }

        return quickSort(Array.from(wordOccurrences)).slice(0, amount);
    },
    mostFrequentWordsReduce: (wordsArray, amount) => {
        let wordOccurrences = new Map();
        const wordsArrayLength = wordsArray.length;

        for (var i = 0; i < wordsArrayLength; i++) {
            if (wordsArray[i] !== '') {
                wordOccurrences.set(wordsArray[i], (wordOccurrences.get(wordsArray[i]) || 0) + 1);
            }
        }

        return Array.from(wordOccurrences).reduce(function (acc, currentKey) {
            for (var i = 0; i < amount; i++) {
                if (!acc[i]) {
                    acc[i] = currentKey;
                    break;
                } else if (acc[i].occurences < wordOccurrences[currentKey]) {
                    acc.splice(i, 0, currentKey);
                    if (acc.length > amount)
                        acc.pop();
                    break;
                }
            }
            return acc;
        }, []);
    }
}

const quickSort = (array) => {
    if (array.length < 2) {
        return array
    }
    const chosenIndex = array.length - 1
    const chosen = array[chosenIndex]
    const a = []
    const b = []
    for (let i = 0; i < chosenIndex; i++) {
        const temp = array[i]
        temp[1] > chosen[1] ? a.push(temp) : b.push(temp)
    }

    const output = [...quickSort(a), chosen, ...quickSort(b)]
    return output
}
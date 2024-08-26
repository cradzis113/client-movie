function getRandomElements(array, numElements, apiSearch) {
    if (numElements > array.length) {
        if (apiSearch) {
            return array.sort((a, b) => b - a).slice(0, 10)
        }

        return array.sort((a, b) => b - a).slice(0, 9)
    }

    const shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }

    return shuffledArray.slice(0, numElements);
}

export default getRandomElements
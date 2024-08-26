function calculateAverageScore(score, totalRating) {
    let averageScore = score / totalRating;

    if (isNaN(averageScore)) {
        averageScore = 0;
    }

    if (averageScore > 10) {
        averageScore = 10;
    }

    averageScore = parseFloat(averageScore.toFixed(1));

    return averageScore;
}

export default calculateAverageScore
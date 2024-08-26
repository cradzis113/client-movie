function truncateText(text, windowWidth) {
    let truncationLength = 75;

    if (windowWidth <= 375) {
        truncationLength = 15;
    } else if (windowWidth <= 470) {
        truncationLength = 25;
    } else if (windowWidth <= 550) {
        truncationLength = 35;
    } else if (windowWidth <= 650) {
        truncationLength = 35;
    } else if (windowWidth <= 750) {
        truncationLength = 45;
    } else if (windowWidth <= 820) {
        truncationLength = 50;
    } else if (windowWidth <= 900) {
        truncationLength = 60;
    } else if (windowWidth <= 960) {
        truncationLength = 60;
    } else if (windowWidth <= 1010) {
        truncationLength = 60;
    } else if (windowWidth <= 1025) {
        truncationLength = 65;
    } 

    return text?.length > truncationLength ? `${text?.substring(0, truncationLength)}...` : text
}

export default truncateText
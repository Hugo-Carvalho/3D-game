const widthPercentageToDP = widthPercent => {
    const screenWidth = window.screen.width;
    // Convert string input to decimal number
    const elemWidth = parseFloat(widthPercent);
    return screenWidth * elemWidth / 100;
};

const heightPercentageToDP = heightPercent => {
    const screenHeight = window.screen.height;
    // Convert string input to decimal number
    const elemHeight = parseFloat(heightPercent);
    return screenHeight * elemHeight / 100;
};

export {
    widthPercentageToDP,
    heightPercentageToDP
};
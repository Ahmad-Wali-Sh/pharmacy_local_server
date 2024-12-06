function generateRandomBarcode() {
    const min = 1000000000000; // Minimum 13-digit number
    const max = 9999999999999; // Maximum 13-digit number
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber.toString();
}

module.exports = generateRandomBarcode
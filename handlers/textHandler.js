const { TextEncoder } = require('util'); 
// Adding TextEncoder for current versions of Node.js
const encodeText = (text) => {
    const utf8Encoder = new TextEncoder();
    return utf8Encoder.encode(text); // Encoding the input text
};
// Encoding the text input
module.exports = encodeText;

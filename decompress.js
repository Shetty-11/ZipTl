const fs = require('fs');
const { buildHuffmanTree, decompressText, getFrequencyMap } = require('./huffman');

// Read compressed file
const compressedFile = 'compressed.bin';
const compressedText = fs.readFileSync(compressedFile, 'binary');

// You need the frequency map or tree to decompress (either store it separately or calculate it)
// For simplicity, we're using the original input file to rebuild the tree
const inputFile = 'input.txt';
const inputText = fs.readFileSync(inputFile, 'utf8');

// Step 1: Rebuild the frequency map
const frequencyMap = getFrequencyMap(inputText);

// Step 2: Rebuild the Huffman tree
const huffmanTree = buildHuffmanTree(frequencyMap);

// Step 3: Decompress the text
const decompressedText = decompressText(compressedText, huffmanTree);

// Step 4: Save decompressed text to file
fs.writeBitStreamToFile('decompressed.txt', decompressedText, 'utf8');
console.log('File decompressed successfully!');


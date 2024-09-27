const fs = require('fs');
const { getFrequencyMap, buildHuffmanTree, generateHuffmanCodes, compressText } = require('./huffman');

// Read input file
const inputFile = 'input.txt';
const inputText = fs.readFileSync(inputFile, 'utf8');

// Step 1: Get frequency map
const frequencyMap = getFrequencyMap(inputText);

// Step 2: Build Huffman tree
const huffmanTree = buildHuffmanTree(frequencyMap);

// Step 3: Generate Huffman codes
const huffmanCodes = generateHuffmanCodes(huffmanTree);

// Step 4: Compress the text
const compressedText = compressText(inputText, huffmanCodes);

// Step 5: Save compressed text to file
fs.writeFileSync('compressed.bin', compressedText, 'binary');
console.log('File compressed successfully!');


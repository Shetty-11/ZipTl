const fs = require('fs');

// Node for the Huffman tree
class Node {
    constructor(char, freq, left = null, right = null) {
        this.char = char;
        this.freq = freq;
        this.left = left;
        this.right = right;
    }
}

// Generate frequency map
function getFrequencyMap(text) {
    const freqMap = {};
    for (const char of text) {
        freqMap[char] = (freqMap[char] || 0) + 1;
    }
    return freqMap;
}

// Build the Huffman tree
function buildHuffmanTree(freqMap) {
    const nodes = Object.entries(freqMap).map(([char, freq]) => new Node(char, freq));
    
    while (nodes.length > 1) {
        // Sort by frequency
        nodes.sort((a, b) => a.freq - b.freq);

        // Take two lowest frequency nodes and merge
        const left = nodes.shift();
        const right = nodes.shift();
        const newNode = new Node(null, left.freq + right.freq, left, right);

        nodes.push(newNode);
    }

    return nodes[0]; // Root of the tree
}

// Generate Huffman codes from the tree
function generateHuffmanCodes(root, code = '', codes = {}) {
    if (!root) return;

    if (root.char !== null) {
        codes[root.char] = code;
    }

    generateHuffmanCodes(root.left, code + '0', codes);
    generateHuffmanCodes(root.right, code + '1', codes);

    return codes;
}

// Compress text using Huffman codes
function compressText(text, codes) {
    let compressed = '';
    for (const char of text) {
        compressed += codes[char];
    }
    return compressed;
}

// Decompress binary string using Huffman tree
function decompressText(compressedText, root) {
    let result = '';
    let currentNode = root;

    for (const bit of compressedText) {
        if (bit === '0') {
            currentNode = currentNode.left;
        } else {
            currentNode = currentNode.right;
        }

        if (currentNode.char !== null) {
            result += currentNode.char;
            currentNode = root;
        }
    }

    return result;
}

module.exports = { getFrequencyMap, buildHuffmanTree, generateHuffmanCodes, compressText, decompressText };


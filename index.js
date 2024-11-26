const substitutionTable = {
  'A': 'AD', 'B': 'AF', 'C': 'AG', 'D': 'AV', 'E': 'AX', 'F': 'DA', 'G': 'DF',
  'H': 'DG', 'I': 'DV', 'J': 'DX', 'K': 'GA', 'L': 'GF', 'M': 'GG', 'N': 'GV',
  'O': 'GX', 'P': 'VA', 'Q': 'VF', 'R': 'VG', 'S': 'VV', 'T': 'VX', 'U': 'XA',
  'V': 'XF', 'W': 'XG', 'X': 'XV', 'Y': 'XX', 'Z': 'ZA', '0': 'ZF', '1': 'ZG',
  '2': 'ZV', '3': 'ZX', '4': 'AA', '5': 'AF', '6': 'AG', '7': 'AV', '8': 'AX',
  '9': 'BA', ' ': 'BF', ',': 'BG', '.': 'BH', ':': 'BI', ';': 'BJ', '?': 'BK',
  '!': 'BL', '"': 'BM', "'": 'BN', '(': 'BO', ')': 'BP', '-': 'BQ', '_': 'BR'
};

const reverseSubstitutionTable = Object.fromEntries(
  Object.entries(substitutionTable).map(([key, value]) => [value, key])
);

function encrypt() {
  const text = document.getElementById('text').value.toUpperCase();
  const key = document.getElementById('key').value.toUpperCase();
  const encodedText = encodeText(text);
  const transposedText = transpose(encodedText, key);
  document.getElementById('result').value = transposedText;
}

function decrypt() {
  const text = document.getElementById('text').value.toUpperCase();
  const key = document.getElementById('key').value.toUpperCase();
  const transposedText = transposeBack(text, key);
  const decodedText = decodeText(transposedText);
  document.getElementById('result').value = decodedText;
}

function encodeText(text) {
  return [...text].map(char => substitutionTable[char] || char).join('');
}

function decodeText(encodedText) {
  const pairs = encodedText.match(/.{1,2}/g) || []; 
  return pairs.map(pair => reverseSubstitutionTable[pair] || pair).join('');
}

function transpose(text, key) {
  const keyLength = key.length;
  const numCols = keyLength;
  const numRows = Math.ceil(text.length / numCols);
  const paddedLength = numRows * numCols;
  const paddedText = text.padEnd(paddedLength, ' ');

  const grid = [];
  for (let i = 0; i < numRows; i++) {
      grid.push(paddedText.substring(i * numCols, (i + 1) * numCols));
  }

  const sortedKeyIndices = [...key].map((k, i) => [k.charCodeAt(0), i]).sort((a, b) => a[0] - b[0]).map(item => item[1]);

  let result = '';
  for (let i = 0; i < numCols; i++) {
      for (let j = 0; j < numRows; j++) {
          const charIndex = j * numCols + sortedKeyIndices[i];
          const char = paddedText[charIndex];
          if (char !== ' ' || (char === ' ' && charIndex < text.length)) {
              result += char;
          }
      }
  }
  return result; 
}



function transposeBack(text, key) {
  const keyLength = key.length;
  const numCols = keyLength;
  const numRows = Math.ceil(text.length / numCols);
  const originalTextLength = text.length; 

  const grid = Array.from({ length: numRows }, () => new Array(numCols).fill(""));

  const sortedKeyIndices = [...key].map((k, i) => [k.charCodeAt(0), i]).sort((a, b) => a[0] - b[0]).map(item => item[1]);

  let index = 0;
  for (let i = 0; i < numCols; i++) {
      for (let j = 0; j < numRows; j++) {
          const gridIndex = j * numCols + sortedKeyIndices[i];

          if (gridIndex < originalTextLength) { 
              grid[j][sortedKeyIndices[i]] = text[index++];
          }

      }
  }

  let result = '';
  for (let j = 0; j < numRows; j++) {
      result += grid[j].join('');
  }
  return result.trim();

}

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
  return [...text].map(char => substitutionTable[char] || char).join(''); // Add char for non-substitutable characters
}

function decodeText(encodedText) {
  const pairs = encodedText.match(/.{1,2}/g) || []; // Use || [] to handle null case
  return pairs.map(pair => reverseSubstitutionTable[pair] || pair).join(''); // Add pair for non-substitutable characters
}

function transpose(text, key) {
  const columns = Math.ceil(text.length / key.length);
  const paddedText = text.padEnd(columns * key.length, 'X');
  const grid = [];

  for (let i = 0; i < columns; i++) {
    grid.push(paddedText.slice(i * key.length, (i + 1) * key.length));
  }

  const sortedKeyIndices = [...key].map((k, i) => [k, i]).sort().map(([, i]) => i);
  return sortedKeyIndices.map(i => grid.map(row => row[i]).join('')).join('');
}

function transposeBack(text, key) {
  const columns = Math.ceil(text.length / key.length);
  const sortedKeyIndices = [...key].map((k, i) => [k, i]).sort().map(([, i]) => i);
  const grid = Array.from({ length: columns }, () => Array(key.length).fill(''));

  let index = 0;
  for (const i of sortedKeyIndices) {
    for (let j = 0; j < columns; j++) {
      if (index < text.length) {
        grid[j][i] = text[index++];
      }
    }
  }

  return grid.map(row => row.join('')).join('').replace(/X+$/, '');
}

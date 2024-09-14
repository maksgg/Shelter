const MORSE_TABLE = {
  '.-':     'a',
  '-...':   'b',
  '-.-.':   'c',
  '-..':    'd',
  '.':      'e',
  '..-.':   'f',
  '--.':    'g',
  '....':   'h',
  '..':     'i',
  '.---':   'j',
  '-.-':    'k',
  '.-..':   'l',
  '--':     'm',
  '-.':     'n',
  '---':    'o',
  '.--.':   'p',
  '--.-':   'q',
  '.-.':    'r',
  '...':    's',
  '-':      't',
  '..-':    'u',
  '...-':   'v',
  '.--':    'w',
  '-..-':   'x',
  '-.--':   'y',
  '--..':   'z',
  '.----':  '1',
  '..---':  '2',
  '...--':  '3',
  '....-':  '4',
  '.....':  '5',
  '-....':  '6',
  '--...':  '7',
  '---..':  '8',
  '----.':  '9',
  '-----':  '0',
};

let expr
function decode(expr) { 
  const arrBlock = expr.match(/.{1,10}/g) || [];

  let decodedMessage = '';
  for (let segment of arrBlock) {
    if (segment === '**********') {
      decodedMessage += ' ';
    } else {
      let morseCode = segment
        .replace(/10/g, '.')
        .replace(/11/g, '-')
        .replace(/0/g, ''); 
      decodedMessage += MORSE_TABLE[morseCode] || '';
      console.log(MORSE_TABLE[morseCode])
    }
  }
  return decodedMessage;
}
decode('1111111010**********1010111111111111111000111010101010101011001110101011111110100011101110');  // ділити на на підмасиви довжина яких 10 і звіряти їх з ключами на відповідність
const gridCells = document.getElementsByClassName('grid');
const expression = document.getElementsByClassName('expression')[0];
const keyboardKeys = document.getElementsByClassName('keyboard-key');

const keyData = {
  // 0 - not used, 1 - correct spot, 2 - wrong spot, 3 - not in answer
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
  7: 0,
  8: 0,
  9: 0,
  0: 0,
  ',': 0,
};

var index = 0;
var column = 0;
var guessesString = '';

var n1 = Math.ceil(Math.random(1) * 200);
var n2 = Math.ceil(Math.random(1) * 50);

var answer = `${n1 / n2}`.substring(0, 5).replace('.', ',');

const missingChars = 5 - answer.length;
if (answer.length < 5) for (var i = 0; i < missingChars; i++) answer += '0';

expression.innerHTML = `${n1} / ${n2}`;

const replaceChar = (str, n, char) => {
  str = str.split('');
  str[n] = char;
  return str.join('');
};

const handleGuess = () => {
  var guess = '';
  var answerCopy = answer;

  for (var i = 0; i < 5; i++) guess += gridCells[i + column * 5].innerHTML;

  for (var i = 0; i < 5; i++) {
    gridCells[i + column * 5].classList.add('set');

    if (guess[i] === answerCopy[i]) {
      gridCells[i + column * 5].classList.add('correct-spot');
      answerCopy = replaceChar(answerCopy, i, '*');

      keyData[guess[i]] = 1;
    }
  }

  for (var i = 0; i < 5; i++) {
    if (answerCopy.includes(guess[i])) {
      gridCells[i + column * 5].classList.add('wrong-spot');
      answerCopy = answerCopy.replace(guess[i], '*');

      if (keyData[guess[i]] == 0) keyData[guess[i]] = 2;
    } else {
      gridCells[i + column * 5].classList.add('wrong-character');

      if (keyData[guess[i]] == 0) keyData[guess[i]] = 3;
    }
  }

  guessesString += guess;

  for (var i = 1; i < keyboardKeys.length - 1; i++) {
    const value = keyboardKeys[i].innerHTML;

    switch (keyData[value]) {
      case 1:
        keyboardKeys[i].classList.add('correct-spot');
        break;

      case 2:
        keyboardKeys[i].classList.add('wrong-spot');
        break;

      case 3:
        keyboardKeys[i].classList.add('wrong-character');
        break;

      default:
        break;
    }
  }
};

const checkKeyPress = (event) => {
  switch (event.keyCode) {
    case 48:
      handleKeyPress('0');
      break;

    case 49:
      handleKeyPress('1');
      break;

    case 50:
      handleKeyPress('2');
      break;

    case 51:
      handleKeyPress('3');
      break;

    case 52:
      handleKeyPress('4');
      break;

    case 53:
      handleKeyPress('5');
      break;

    case 54:
      handleKeyPress('6');
      break;

    case 55:
      handleKeyPress('7');
      break;

    case 56:
      handleKeyPress('8');
      break;

    case 57:
      handleKeyPress('9');
      break;

    case 188:
      handleKeyPress(',');
      break;

    case 13:
      handleKeyPress('Enter');
      break;

    case 8:
      handleKeyPress('Delete');
      break;

    default:
      return;
  }
};

const handleKeyPress = (key) => {
  switch (key) {
    case 'Enter':
      if (index !== 5 || column >= 6) return;

      handleGuess();

      column++;
      index = 0;

      break;

    case 'Delete':
      if (index === 0 || column >= 6) return;

      gridCells[index + column * 5 - 1].innerHTML = '';
      index--;

      break;

    default:
      if (index >= 5 || column > 5) return;

      gridCells[index + column * 5].innerHTML = key;
      index++;

      break;
  }
};

document.addEventListener('keydown', (event) => checkKeyPress(event));

for (key in [...keyboardKeys]) {
  keyboardKeys[key].addEventListener('click', (event) => handleKeyPress(event.path[0].innerHTML));
}

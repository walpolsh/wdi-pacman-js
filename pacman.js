// Setup initial game stats
var score = 0;
var lives = 2;

var dots = 240;

var power_pellets = 4;
var level = 1;


// Define your ghosts here
var inky = {
  menu_option: '1',
  name: 'Inky',
  colour: 'Red',
  character: 'Shadow',
  edible: false
};

var blinky = {
  menu_option: '2',
  name: 'Blinky',
  colour: 'Cyan',
  character: 'Speedy',
  edible: false
};

var pinky = {
  menu_option: '3',
  name: 'Pinky',
  colour: 'Pink',
  character: 'Bashful',
  edible: false
};

var clyde = {
  menu_option: '4',
  name: 'Clyde',
  colour: 'Orange',
  character: 'Pokey',
  edible: false
};

// replace this comment with your four ghosts setup as objects

var ghosts = [inky, blinky, pinky, clyde]

// Draw the screen functionality
function drawScreen() {
  clearScreen();
  setTimeout(function() {
    displayStats();
    displayMenu();
    displayPrompt();
  }, 10);
}

function clearScreen() {
  console.log('\x1Bc');
}

function displayStats() {
  console.log('Score: ' + score + '     Lives: ' + lives);

  console.log('Power-Pellets: ' + power_pellets );

  console.log('Dots left: ' + dots );

  console.log('Level: ' + level );
}

function displayMenu() {
  console.log('\n\nSelect Option:\n');  // each \n creates a new line
  console.log('(d) Eat 1 Dot');
  if (dots > 10) {
  console.log('(s) Eat 10 Dots');
  }
  if (dots > 100) {
    console.log('(a) Eat 100 Dots');
  }
  if (power_pellets > 0) {
    console.log('(p) Power-Pellets');
  }

  console.log('(1) Eat Inky ' + '(' + ghosts[0].edible + ')' );

  console.log('(2) Eat Blinky ' + '(' + ghosts[1].edible + ')' );

  console.log('(3) Eat Pinky ' + '(' + ghosts[2].edible + ')' );

  console.log('(4) Eat Clyde ' + '(' + ghosts[3].edible + ')' );

  console.log('(q) Quit');
}

function displayPrompt() {
  // process.stdout.write is similar to console.log except it doesn't add a new line after the text
  process.stdout.write('\nWaka Waka :v '); // :v is the Pac-Man emoji.
}


// Menu Options
function eatDot() {
  console.log('\nChomp!');
  score += 10;
  dots -= 1;
}

function eat10Dots() {
  console.log('\nChomp!');
  score += 100;
  dots -= 10;
}

function eat100Dots() {
  console.log('\nChomp!');
  score += 1000;
  dots -= 100;
}

// For Loop: for ([initialExpression]; [condition]; [incrementExpression])
function eatPowerPellet() {
  console.log('\nChomp!');
  score += 50;
  power_pellets -= 1;
  for (var i = 0; i <= 3; i++) {
    ghosts[i].edible = true}
}

function eatInky() {
  console.log('\nChomp!');
  eatGhost(inky);
}

function eatBlinky() {
  console.log('\nChomp!');
  eatGhost(blinky);
}

function eatPinky() {
  console.log('\nChomp!');
  eatGhost(pinky);
}

function eatClyde() {
  console.log('\nChomp!');
  eatGhost(clyde);
}

// Process Player's Input
function processInput(key) {
  switch(key) {
    case '\u0003': // This makes it so CTRL-C will quit the program
    case 'q':
      process.exit();
      break;
    case 'd':
      eatDot();
      break;
    case 's':
      eat10Dots();
      break;
    case 'a':
      eat100Dots();
      break;
    case 'p':
        if (power_pellets > 0)
          eatPowerPellet();
      break;
    case '1':
      eatInky();
      console.log(gameOver())
      break;
    case '2':
      eatBlinky();
      console.log(gameOver())
      break;
    case '3':
      eatPinky();
      console.log(gameOver())
      break;
    case '4':
      eatClyde();
      console.log(gameOver())
      break;
    default:
      console.log('\nInvalid Command!');
  }
}

//Process eating inedible ghost
function eatGhost(ghost) {
  if (ghost.edible === false) {
  lives -= 1;
  score += 200;
  console.log('Oh no you ate ' + ghost.name + ' ' + ghost.colour + '!  Sorry you loose a life! But, you gain' + score );
  }
}

// Process Game Over

function gameOver() {
  if (lives < 0) {
  console.log("Oh rats! Your out of lives, guess I'll see you later!");
  process.exit();
  }
}

// Power-Pellets


//
// YOU PROBABLY DON'T WANT TO CHANGE CODE BELOW THIS LINE
//

// Setup Input and Output to work nicely in our Terminal
var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

// Draw screen when game first starts
drawScreen();

// Process input and draw screen each time player enters a key
stdin.on('data', function(key) {
  process.stdout.write(key);
  processInput(key);
  setTimeout(drawScreen, 300); // The command prompt will flash a message for 300 milliseoncds before it re-draws the screen. You can adjust the 300 number to increase this.
});

// Player Quits
process.on('exit', function() {
  console.log('\n\nGame Over!\n');
});

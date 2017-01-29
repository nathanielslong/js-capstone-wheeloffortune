// Develop a wheel.
// Develop Hangman game.
// Integrate the two.
//
// Let's figure the components of Hangman. 
// We need:
// - if the user gets the whole thing right, something to congratulate
// - if user getse enough wrong, something to scold them and make them try again

// Defining the Puzzle object.
function Puzzle(phrase) {
  this.phrase = phrase;
}

//Defining the Category object.
function Category(title) {
  this.title = title;
  this.puzzles = [];
}

// Adding puzzles and pushing to categories.
var goneWithWind= new Puzzle("frankly, my dear, i don't give a damn");
var wizardOz= new Puzzle("Toto, I've a feeling we're not in Kansas anymore");
var citizenKane = new Puzzle("Rosebud");
var starWars = new Puzzle("May the Force be with you");
var casaBlanca= new Puzzle("Here's looking at you, kid");
var movieQuotes = new Category("Movie Quotes");
movieQuotes.puzzles.push(goneWithWind, wizardOz, citizenKane, starWars, casaBlanca);

var confuscious = new Puzzle("Confuscious");
var immKant = new Puzzle("Immanuel Kant");
var davHume = new Puzzle("David Hume");
var petSing = new Puzzle("Peter Singer");
var aristotle = new Puzzle("Aristotle");
var philosophers = new Category("Famous Philosophers");
philosophers.puzzles.push(confuscious, immKant, davHume, petSing, aristotle);

var hydrogen = new Puzzle("Hydrogen");
var indium = new Puzzle("Indium");
var polSty = new Puzzle("Polystyrene");
var erlen = new Puzzle("Erlenmeyer");
var spectro = new Puzzle("Spectroscopy");
var chemistry = new Category("Chemistry-related questions");
chemistry.puzzles.push(hydrogen, indium, polSty, erlen, spectro);

// Gives a random number in a certain range, which we need to give a random selection from a certain category.
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random()*(max-min+1))+min;
}

// Generates a new puzzle board given the randomly selected phrase.
function makeBoard(phrase) {
  var newPhrase = phrase.replace(/[a-zA-Z]/g, "?");
  var phraseArray = newPhrase.split("");
  var gameBoard = "";
  for (i=0;i<phraseArray.length;i++) {
    var addedClass;
    if (phraseArray[i] == " ") {
      addedClass = "space";
    } else if (phraseArray[i] == "?") {
      addedClass = "letter";
    } else {
      addedClass = "not-letter";
    }
    gameBoard += "<div class=" + addedClass +" id='letter-" + i + "'></div>";
  }
  $("#gameboard").html(gameBoard);
  var notLetIndex = [];
  for (i=0;i<phraseArray.length;i++) {
    if (/[a-z]/i.test(phraseArray[i]) == false) {
      notLetIndex.push(i);
    }
  } 
  for (i=0;i<notLetIndex.length;i++) {
    $("#letter-" + notLetIndex[i]).html(phraseArray[notLetIndex[i]]);
  }
}

// Takes a user inputted guess and determines if it exists in the array. Still needs a way to tell if the puzzle is completed.  
var guesses = [];
function makeGuess(letter) {
  var guess = $("input").val();
  var counter = 0;
  if (/[a-z]/i.test(guess) == false || guess.length > 1) {
    $("#correctness").text("That's not allowed, try again!");
  } else {
    if (guesses == []) {
      guesses.push(guess);
    } else if ($.inArray(guess, guesses) != -1) {
        $("#correctness").text("You already guessed that!");
    } else {
        guesses.push(guess);
        var answerArray = [];
        var phraseArray = selectPhrase.split("");
        for (i=0;i<phraseArray.length;i++) {
          if (guess == phraseArray[i].toLowerCase()) {
            answerArray.push(i);
          }
        }
        if (answerArray.length == 0) {
          $("#correctness").text("Guess Again!");
          $("#letter-guessed").append(guess + " ");
        } else {
          $("#correctness").text("Correct!");
          for (i=0;i<answerArray.length;i++) {
            var letter = phraseArray[answerArray[i]];
            phraseArray.splice[answerArray[i]];
            $("#letter-" + answerArray[i]).html(letter);
            $("#letter-" + answerArray[i]).css({"background-color": "white"})
        }
      }
    }
  }
}

// Sets the movieQuote object so that when clicked, it gets a random puzzle and sets up the board. 
$("#movieQuotes").click(function() {
  randNum = getRandomInt(0, movieQuotes.puzzles.length - 1);
  selectPhrase = movieQuotes.puzzles[randNum].phrase
  $(".initial-page").fadeOut();
  $("form").fadeIn();
  $(".guesses").fadeIn();
  makeBoard(selectPhrase);
})

// Sets the philosophers object so that when clicked, it gets a random puzzle and sets up the board. 
$("#philosophers").click(function() {
  randNum = getRandomInt(0, philosophers.puzzles.length - 1);
  selectPhrase = philosophers.puzzles[randNum].phrase
  $(".initial-page").fadeOut();
  $("form").fadeIn();
  $(".guesses").fadeIn();
  makeBoard(selectPhrase);
})

// Sets the chemistry object so that when clicked, it gets a random puzzle and sets up the board. 
$("#chemistry").click(function() {
  randNum = getRandomInt(0, chemistry.puzzles.length - 1);
  selectPhrase = chemistry.puzzles[randNum].phrase
  $(".initial-page").fadeOut();
  $("form").fadeIn();
  $(".guesses").fadeIn();
  makeBoard(selectPhrase);
})

// Prevents the form object from doing its default page-switching nonsense and starts the guess function.
$("form").submit(function (e) {
  e.preventDefault();
  makeGuess($("input").val());
})

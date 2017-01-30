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
var categories = [];
// Adding puzzles and pushing to categories.
var goneWithWind= new Puzzle("Frankly, my dear, I don't give a damn");
var wizardOz= new Puzzle("Toto, I've a feeling we're not in Kansas anymore");
var citizenKane = new Puzzle("Rosebud");
var starWars = new Puzzle("May the Force be with you");
var casaBlanca= new Puzzle("Here's looking at you, kid");
var movieQuotes = new Category("Movie Quotes");
movieQuotes.puzzles.push(goneWithWind, wizardOz, citizenKane, starWars, casaBlanca);
categories.push(movieQuotes);

var confuscious = new Puzzle("Confuscious");
var immKant = new Puzzle("Immanuel Kant");
var davHume = new Puzzle("David Hume");
var petSing = new Puzzle("Peter Singer");
var aristotle = new Puzzle("Aristotle");
var philosophers = new Category("Famous Philosophers");
philosophers.puzzles.push(confuscious, immKant, davHume, petSing, aristotle);
categories.push(philosophers);

var hydrogen = new Puzzle("Hydrogen");
var indium = new Puzzle("Indium");
var polSty = new Puzzle("Polystyrene");
var erlen = new Puzzle("Erlenmeyer");
var spectro = new Puzzle("Spectroscopy");
var chemistry = new Category("Chemistry-related questions");
chemistry.puzzles.push(hydrogen, indium, polSty, erlen, spectro);
categories.push(chemistry);

// Gives a random number in a certain range, which we need to give a random selection from a certain category.
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random()*(max-min+1))+min;
}

// Generates a new puzzle board given the randomly selected phrase.
function makeBoard(phrase) {
  var newPhrase = phrase.replace(/[a-zA-Z]/g, "?");
  questionArray= newPhrase.split("");
  var gameBoard = "";
  for (i=0;i<questionArray.length;i++) {
    var addedClass;
    if (questionArray[i] == " ") {
      addedClass = "space";
    } else if (questionArray[i] == "?") {
      addedClass = "letter";
    } else {
      addedClass = "not-letter";
    }
    gameBoard += "<div class=" + addedClass +" id='letter-" + i + "'></div>";
  }
  $("#gameboard").html(gameBoard);
  var notLetIndex = [];
  for (i=0;i<questionArray.length;i++) {
    if (/[a-z]/i.test(questionArray[i]) == false) {
      notLetIndex.push(i);
    }
  }
  for (i=0;i<notLetIndex.length;i++) {
    $("#letter-" + notLetIndex[i]).html(questionArray[notLetIndex[i]]);
  }
}

// Takes a user inputted guess and determines if it exists in the array. When completed, prompt to play again, and remove completed puzzle from options.
var guesses = [];
var lives = 10;
function makeGuess(letter) {
  var guess = $("input").val().toLowerCase();
  phraseArray = selectPhrase.split("");
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
        for (i=0;i<phraseArray.length;i++) {
          if (guess == phraseArray[i].toLowerCase()) {
            answerArray.push(i);
          }
        }
        if (answerArray.length == 0) {
          $("#correctness").text("Guess Again!");
          lives--;
          $("#letter-guessed").append(guess + " ");
          $("#lives").html("Lives Remaining: " + lives);
          if (lives == 0) {
            $("#correctness").text("You lose!");
            $("form").hide();
            $(".play-again").show();
            $("#letter-guessed").hide().html("Incorrect Letters: ");
          }
        } else {
          $("#correctness").text("Correct!");
          for (i=0;i<answerArray.length;i++) {
            var letter = phraseArray[answerArray[i]];
            phraseArray.splice[answerArray[i]];
            questionArray.splice[answerArray[i]];
            questionArray[answerArray[i]] = phraseArray[answerArray[i]];
            $("#letter-" + answerArray[i]).html(letter);
            $("#letter-" + answerArray[i]).css({"background-color": "white"})
        }
        if (phraseArray.join("") == questionArray.join("")) {
          $("#correctness").text("You win!");
          $("form").hide();
          $(".play-again").show();
          $("#letter-guessed").hide().html("Incorrect Letters: ");
        }
      }
    }
  }
}

// Allows the user to input a string to attempt to solve the puzzle. If correct, display the solved puzzle. Else, lose a life.
function solvePuzzle(fullGuess) {
  var fullArray = fullGuess.toLowerCase().split("");
  var newPhraseArray = selectPhrase.toLowerCase().split("");
  if (fullArray.join("") == newPhraseArray.join("")) {
    $("#correctness").text("You win!");
    $("form").hide();
    $(".play-again").show();
    $("#letter-guessed").hide().html("Incorrect Letters: ");
  } else {
    $("#correctness").html("Incorrect!");
    lives--;
    $("#lives").html("Lives Remaining: " + lives);
  }
}

// Sets the movieQuote object so that when clicked, it gets a random puzzle and sets up the board. 
$("#movieQuotes").click(function() {
  category = "Movie Quotes";
  randNum = getRandomInt(0, categories[0].puzzles.length - 1);
  if (categories[1].puzzles.length == 0) {
    $("#correctness").show().html("Out of movie quotes! Try another category!");
  } else {
  selectPhrase = categories[0].puzzles[randNum].phrase
  $("#correctness").html("");
  $("#lives").fadeIn();
  $(".initial-page").fadeOut();
  $("form").fadeIn();
  $(".guesses").fadeIn();
  makeBoard(selectPhrase);
}})

// Sets the philosophers object so that when clicked, it gets a random puzzle and sets up the board. 
$("#philosophers").click(function() {
  category = "Famous Philosophers";
  randNum = getRandomInt(0, categories[1].puzzles.length - 1);
  if (categories[1].puzzles.length == 0) {
    $("#correctness").show().html("Out of philosophy questions! Try another category!");
  } else {
  selectPhrase = categories[1].puzzles[randNum].phrase
  $("#correctness").html("");
  $(".initial-page").fadeOut();
  $("#lives").fadeIn();
  $("form").fadeIn();
  $(".guesses").fadeIn();
  makeBoard(selectPhrase);
}})

// Sets the chemistry object so that when clicked, it gets a random puzzle and sets up the board. 
$("#chemistry").click(function() {
  category = "Chemistry-related questions";
  randNum = getRandomInt(0, categories[2].puzzles.length - 1);
  if (categories[2].puzzles.length == 0) {
    $("#correctness").show().html("Out of chemistry questions! Try another category!");
  } else{
    selectPhrase = chemistry.puzzles[randNum].phrase
    $("#correctness").html("");
    $(".initial-page").fadeOut();
    $("#lives").fadeIn();
    $("form").fadeIn();
    $(".guesses").fadeIn();
    makeBoard(selectPhrase);
  }
})

// Prevents the form object from doing its default page-switching nonsense and starts the guess function.
$("#guessing").click(function (e) {
  e.preventDefault();
  makeGuess($("#guess").val());
})

// Removes previous puzzle from the options, and returns the user to the inial load screen by hiding all previous elements.
$(".play-again").click(function() {
  for (i=0;i<categories.length;i++) {
    if (categories[i].title == category) {
      categories[i].puzzles.splice(randNum, 1);
    }
  }
  lives = 10;
  $(".initial-page").fadeIn();
  $("#gameboard").html("");
  // so this line should actually work, but I can't get it to work to reset the input.
  $("#guess").trigger("reset");
  $(".new-game").hide();
  $("#lives").html("Lives Remaining: " + lives).hide();
  $("#correctness").html("");
  guesses = [];
})

// Sets up the puzzle solve event
$("#solving").click(function (e) {
  e.preventDefault();
  solvePuzzle($("#solution").val());
})

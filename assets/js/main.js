// Alright, here's what I need to do for this project.
//
// Develop a wheel.
// Develop Hangman game.
// Integrate the two.
//
// Should be easy, right?
// 
// First, let's do Hangman.
//
// Let's figure the components of Hangman. 
// We need:
// - a database of categories and words/phrases in the categories
// - a way to display the blank version of the word/phrase
// - something that allows the user to guess
// - something that determines if the answer is correct
//    - if answer correct, output to the blank spaces
//    - if not, something happens to make the user fail
// - if the user gets the whole thing right, something to congratulate
// - if user getse enough wrong, something to scold them and make them try again
//
// I think that's everything. So let's just do things.
//
// First, the database of categories and words/phrases.
// Let's make them objects, that seems like a smart idea. Maybe we could let the user eventually add their own things?
// We'll make the puzzles (words and phrases) and put them inside of a category object.

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
var goneWithWind= new Puzzle("Frankly my dear, I don't give a damn");
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
var polSty= new Puzzle("Polystyrene");
var erlen = new Puzzle("Erlenmeyer");
var spectro = new Puzzle("Spectroscopy");
var chemistry = new Category("Chemistry-related questions");
chemistry.puzzles.push(hydrogen, indium, polSty, erlen, spectro);

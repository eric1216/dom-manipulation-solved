/**
 * LOCAL STORAGE AND DOM MANIPULATION
 * In this task you will write some functions to let the browser save
 * some of your actions results and retrieve them when the page is reloaded.
 * You will be working with the localStorage.
 * Make sure to read the following exercise-info file/files before you start
 * * 03 LocalStorage.md
 * * 04 EventDelegation.md
 * Local Storage might be shortened to "LS" in the comments beneath.
 * @requirement
 * Event delegation MUST be used
 */

/**
 * @task
 * Implement the 'click' event that solves several tasks by the item click:
 * * If the item is NOT in favorites LS and has white background color
 * * * Changes the color of the box to red
 * * * Add the item's id to the local storage
 * * Else if the box is in favorites LS and has white red color
 * * * Changes the color of the box to white
 * * * Add the item's id to the local storage
 * * Make all the items that are listed in the favorites LS save the red background color when the page is reloaded
 */

/**
 * @hint
 * Here is a plan of how you can structure your code. You can follow it or choose your own way to go
 * * Select the container that holds all the items
 * * Create a function that sets the background to be red for the item with an id listed in favorites LS
 * * Run this function
 * * Create a function that adds an id to favorites LS by id passed as an argument
 * * Create a function that deletes an id from favorites LS by id passed as an argument
 * * Create a callback function that updates the element background color and does the
 * * /~/ action with the item's id depending on if it is in LS or not. The function should
 * * /~/ do that to a specific item that has a specific class value
 * * add the event listener to the container, pass the callback.
 */

// Your code goes here...
const container = document.querySelector('.cardsContainer');

// crete local storage array
// if it already exists, call it
const storedArray = localStorage.getItem('favsArrKey');
let favsArr = storedArray ? JSON.parse(storedArray) : [];

// add red background to items from favorite array
const addBackground = () => {
  const cards = container.querySelectorAll('.card');

  cards.forEach((item) => {
    if (favsArr.includes(item.id)) {
      item.style.backgroundColor = 'red';
    } else {
      item.removeAttribute('style');
    }
  });
};

addBackground();

// add items to favorites list
const addToFavorites = (id) => {
  if (!favsArr.includes(id)) {
    favsArr.push(id);
  }

  localStorage.setItem('favsArrKey', JSON.stringify(favsArr));
};

// remove items from favorites list
const removeFromFavorites = (id) => {
  const idIndex = favsArr.indexOf(id);
  favsArr.splice(idIndex, 1);

  localStorage.setItem('favsArrKey', JSON.stringify(favsArr));
};

// on click call back
const callBackFun = (e) => {
  const card = e.target;

  if (Array.from(card.classList).includes('card')) {
    if (!favsArr.includes(card.id)) {
      addToFavorites(card.id);
    } else if (favsArr.includes(card.id)) {
      removeFromFavorites(card.id);
    }
  }

  addBackground();
};

// add eventListener to container
container.addEventListener('click', callBackFun);

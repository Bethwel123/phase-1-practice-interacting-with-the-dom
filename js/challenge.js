const counterElement = document.getElementById('counter');
const plusButton = document.getElementById('plus');
const minusButton = document.getElementById('minus');
const heartButton = document.getElementById('heart');
const pauseButton = document.getElementById('pause');
const likesList = document.querySelector('.likes');
const commentForm = document.getElementById('comment-form');
const commentInput = document.getElementById('comment-input');
const commentsList = document.getElementById('list');

let counter = 0;
let likes = {}; 
let intervalId;

function updateCounterDisplay() {
  counterElement.textContent = counter;
}

function incrementCounter() {
  counter++;
  updateCounterDisplay();
}

function decrementCounter() {
  if (counter > 0) {
    counter--;
    updateCounterDisplay();
  }
}

function likeCounter() {
  likes[counter] = (likes[counter] || 0) + 1;
  updateLikesDisplay();
}

function updateLikesDisplay() {
  likesList.innerHTML = '';
  for (const count in likes) {
    const li = document.createElement('li');
    li.textContent = `${count}: ${likes[count]} likes`;
    likesList.appendChild(li);
  }
}

let isPaused = false;

function pauseCounter() {
  if (!isPaused) {
    clearInterval(intervalId);
    pauseButton.textContent = 'resume';
    plusButton.disabled = true;
    minusButton.disabled = true;
    heartButton.disabled = true;
    isPaused = true;
  } else {
    intervalId = setInterval(incrementCounter, 1000);
    pauseButton.textContent = 'pause';
    plusButton.disabled = false;
    minusButton.disabled = false;
    heartButton.disabled = false;
    isPaused = false;
  }
}

function submitComment(e) {
  e.preventDefault();
  const commentText = commentInput.value;
  if (commentText.trim() !== '') {
    const li = document.createElement('li');
    li.textContent = commentText;
    commentsList.appendChild(li);
    commentInput.value = '';
  }
}

plusButton.addEventListener('click', incrementCounter);
minusButton.addEventListener('click', decrementCounter);
heartButton.addEventListener('click', likeCounter);
pauseButton.addEventListener('click', pauseCounter);
commentForm.addEventListener('submit', submitComment);

updateCounterDisplay();

intervalId = setInterval(incrementCounter, 1000);

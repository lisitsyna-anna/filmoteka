const KEY_WATCHED_MOVIES = 'watchedMovies';
const KEY_QUEUE_MOVIES = 'queueMovies';

function loadFromLocalStorage(key) {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
}

function saveToLocalStorage(key, value) {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
}

function checkLocalStorageWatchedMovies(btn, selectedMovie) {
  let localWatchedMovies = loadFromLocalStorage(KEY_WATCHED_MOVIES);

  if (localWatchedMovies) {
    if (localWatchedMovies[selectedMovie.id]) {
      btn.textContent = 'ADD TO WATCHED';
      delete localWatchedMovies[selectedMovie.id];
    } else {
      btn.textContent = 'REMOVE FROM WATCHED';
      localWatchedMovies[selectedMovie.id] = selectedMovie;
    }
  } else {
    localWatchedMovies = {};
    localWatchedMovies[selectedMovie.id] = selectedMovie;
    btn.textContent = 'REMOVE FROM WATCHED';
  }

  saveToLocalStorage(KEY_WATCHED_MOVIES, localWatchedMovies);
}

function checkLocalStorageQueueMovies(btn, selectedMovie) {
  let localQueueMovies = loadFromLocalStorage(KEY_QUEUE_MOVIES);

  if (localQueueMovies) {
    if (localQueueMovies[selectedMovie.id]) {
      btn.textContent = 'ADD TO QUEUE';
      delete localQueueMovies[selectedMovie.id];
    } else {
      btn.textContent = 'REMOVE FROM QUEUE';
      localQueueMovies[selectedMovie.id] = selectedMovie;
    }
  } else {
    localQueueMovies = {};
    localQueueMovies[selectedMovie.id] = selectedMovie;
    btn.textContent = 'REMOVE FROM QUEUE';
  }

  saveToLocalStorage(KEY_QUEUE_MOVIES, localQueueMovies);
}

export {
  KEY_WATCHED_MOVIES,
  KEY_QUEUE_MOVIES,
  loadFromLocalStorage,
  saveToLocalStorage,
  checkLocalStorageWatchedMovies,
  checkLocalStorageQueueMovies,
};

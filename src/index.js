console.log('Hello, world!');

// Assuming upcomingData is already defined and contains the array of results

// Get a random index within the range of the results array
const randomIndex = Math.floor(Math.random() * upcomingData.results.length);

// Get the random result
const randomResult = upcomingData.results[randomIndex];

// Set the src attribute of the poster and backdrop images
const posterImg = document.getElementById('randomPoster');
posterImg.src = `https://image.tmdb.org/t/p/w500${randomResult.poster_path}`;
posterImg.alt = randomResult.title;

const backdropImg = document.getElementById('randomBackdrop');
backdropImg.src = `https://image.tmdb.org/t/p/w500${randomResult.backdrop_path}`;
backdropImg.alt = randomResult.title;

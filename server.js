const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Movies = require('./movies-data-small.json');

const app = express();

app.use(morgan('dev'));
app.use(cors());

// Users can search for Movies by genre, country or avg_vote


const handleGetMovie = (req, res) => {
  const {genre, country, avg_vote} = req.query;
  let results = Movies;
  results = handleGetGenre(genre, results);
  results = handleGetCountry(country, results);
  results = handleGetVote(avg_vote, results);

  res.send(results);
};

const handleGetGenre = (genre, movies) => {
  genre = (genre ? genre.toLowerCase() : '');
  return movies.filter(movie => movie['genre'] && movie['genre'].toLowerCase().includes(genre));
};

const handleGetCountry = (country, movies) => {
  country = (country ? country.toLowerCase() : '');
  return movies.filter(movie => movie['country'] && movie['country'].toLowerCase().includes(country));
};

const handleGetVote = (avgVote, movies) => {
  return movies;
};

app.get('/movie', handleGetMovie);

app.listen(8000, () => {});
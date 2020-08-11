require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Movies = require('./movies-data-small.json');

const app = express();

app.use(morgan('dev'));
app.use(cors());

app.use(validateUser);

const validateUser = (req, res, next) => {
  const apiToken = process.env.API_TOKEN
  const authToken = req.get('Authorization')

  if (!authToken || authToken.split(' ')[1] !== apiToken) {
    return res.status(401).json({ error: 'Unauthorized request' })
  }

  next()
}


const handleGetMovie = (req, res) => {
  const {genre, country, avg_vote} = req.query;
  let results = Movies;
  results = handleGetGenre(genre, results);
  results = handleGetCountry(country, results);
  results = handleGetVote(avg_vote, results);

  res.send(results);
};

const handleGetGenre = (genre, movies) => {
  if(!genre){
    return movies;
  }
  genre = genre.toLowerCase();
  return movies.filter(movie => movie['genre'] && movie['genre'].toLowerCase().includes(genre));
};

const handleGetCountry = (country, movies) => {
  if(!country){
    return movies;
  }
  country = country.toLowerCase();
  return movies.filter(movie => movie['country'] && movie['country'].toLowerCase().includes(country));
};

const handleGetVote = (avgVote, movies) => {
  if(!avgVote){
    return movies;
  } 
  avgVote = parseInt(avgVote)
  if(isNaN(avgVote)) {
    return movies;
  }
  return movies.filter(movie => movie['avg_vote'] && movie['avg_vote'] >= avgVote)
};

app.get('/movie', handleGetMovie);

app.listen(8000, () => {});
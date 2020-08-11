const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Movies = require('./movies-data-small.json')

const app = express()

app.use(morgan('dev'))
app.use(cors())

// Users can search for Movies by genre, country or avg_vote


const handleGetMovie = (req, res) => {
  results = Movies;
  console.log("Inside handle Movie");
  results = handleGetGenre(req.genre, results);
  results = handleGetCountry(req.country, results);
  results = handleGetVote(req.avg_vote, results);

  res.send(results)
}

app.get('/movie', handleGetMovie)

app.listen(8000, () => {})
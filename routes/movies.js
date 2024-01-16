const router = require('express').Router();

const { createMovie, getAllMovies, deleteMovieById } = require('../controllers/movies');
const { movieIsValid, deleteMovieIsValid } = require('../middlewares/validation');

router.post('/', movieIsValid, createMovie);
router.get('/', getAllMovies);
router.delete('/:movieId', deleteMovieIsValid, deleteMovieById);

module.exports = router;

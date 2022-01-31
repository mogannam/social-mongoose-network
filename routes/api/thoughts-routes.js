const router = require('express').Router();
const {
  getAllThoughts,
  createThought,
  getThoughtByID,
  updateThought,
  deleteThought,
} = require('../../controllers/thoughts-controller');

// /api/thoughts
router
  .route('/')
  .get(getAllThoughts)
  .post(createThought);


// /api/thoughts/:id
router
  .route('/:id')
  .get(getThoughtByID)
  .put(updateThought)
  .delete(deleteThought);

 

module.exports = router;

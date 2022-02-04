const router = require('express').Router();

// import some helper functions from our controller files
const {
    getAllThoughts,
    createThought,
    getThoughtByID,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thoughts-controller');

// /api/thoughts/
router
    .route('/') // setup the route /api/thoughts/
    .get(getAllThoughts) // if we perfrom a get with /api/thoughts/ call the function getAll thoughts
    .post(createThought); // if we call post with /api/thoughts/ call createThought
//api/:thoughtId/reactions
router
    .route('/:thoughtId/reactions')
    .post(addReaction)
//api/:thoughtId/reactions/:reactionId
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction)

// /api/thoughts/:id
router
    .route('/:thoughtId')
    .get(getThoughtByID)
    .put(updateThought)
    .delete(deleteThought);



module.exports = router;

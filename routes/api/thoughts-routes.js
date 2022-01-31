const router = require('express').Router();
const {
    getAllThoughts,
    createThought,
    getThoughtByID,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thoughts-controller');

// /api/thoughts
router
    .route('/')
    .get(getAllThoughts)
    .post(createThought);

router
    .route('/:thoughtId/reactions')
    .post(addReaction)

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

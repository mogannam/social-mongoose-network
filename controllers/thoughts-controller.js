// //getAllThoughts,
// getThoughtByID,
// createThought,
// updateThought,
// deleteThought,

const { Thoughts, User } = require('../models');

const ThoughtsController = {
  // get all Thoughts
  getAllThoughts(req, res) {
    Thoughts.find({})
      .select('-__v') // get all thoughts fields except for the version field
      .sort({ _id: -1 }) // sort by lowest id
      .then(dbThoughtsData => res.json(dbThoughtsData)) // then return the data/status or cath an error
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // get one Thoughts by id
  getThoughtByID({ params }, res) {
    Thoughts.findOne({ _id: params.id })
      .select('-__v')
      .then(dbThoughtsData => res.json(dbThoughtsData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // create Thought
  createThought({ body }, res) {
    Thoughts.create(body) // create the thought
      .then(async dbThoughtsData =>{ 
        // then add the though id to the users Schema & finally return thought data
        await User.findOneAndUpdate( // find the correct user and only update the thoughts array of ids
          { _id: body.userId},  // by user id in the params
          {$push:{thoughts: dbThoughtsData._id}}, // push the new thoughts id aka dbThoughtsData._id, whats returned py posting a new thought
          { new: true })
          .then(dbUserData => { 
            if (!dbUserData) {
              res.status(404).json({ message: 'No User found with this id!' });
              return;
            }
            //res.json(dbUserData); // do not return user data, continue thru and return thoughts data
          })
          .catch(err => res.json(err)); // catch an error if updating the user fails

         res.json(dbThoughtsData) // return thoughts data
      })
      .catch(err => res.json(err));

  },

  // update thought by id
  updateThought({ params, body }, res) {
    Thoughts.create(body)
    .findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then(dbThoughtsData => {
        if (!dbThoughtsData) {
          res.status(404).json({ message: 'No Thought found with this id!' });
          return;
        }
        res.json(dbThoughtsData);
      })
      .catch(err => res.json(err));
  },

  // delete Thought
  deleteThought({ params }, res) {
    Thoughts.findOneAndDelete({ _id: params.id })
      .then(dbThoughtsData => res.json(dbThoughtsData))
      .catch(err => res.json(err));
  },



};

module.exports = ThoughtsController;

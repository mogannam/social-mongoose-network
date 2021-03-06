const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const msgThought = "your thoughts must be between 1 & 280 characters"
const msdUsername = "username is required to leave a thought"

// reactions are like replies to a comment

const ReactionsSchema = new Schema(
  {
    // set custom id to avoid confusion with parent comment _id
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: { // contatins text, like a reply to a comment
      type: String,
      required: [true, msgThought],
      min: [1, msgThought],  // set a min length, and custom error
      max: 280
    },
    username: {
      type: String,
      required: [true, msdUsername]
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    } // get calls a function dateFormat and formats the data in the argument passed to 
  }, // it called timestamp
  {
    toJSON: {
      getters: true  // allows the use of get in createdAt
    },
    id: false // turns of the auto generation of ids b/c we generate _ids
  }
);



//Thoughts is the parent document -> reactions are nested in the thoughts document
const ThoughtsSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'username is required'],
    },
    thoughtText: {
      type: String,
      required: [true, msgThought],
      min: [1, msgThought],
      max: 280,

    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    // use ReactionSchema to validate data for a reaction
    // an array of reaction objects
    reactions: [ReactionsSchema]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);



ThoughtsSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thoughts = model('Thoughts', ThoughtsSchema);

module.exports = Thoughts;

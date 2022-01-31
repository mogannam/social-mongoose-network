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
    reactionBody: {
      type: String,
      required : [true, msgThought],
      min: [1, msgThought],
      max: 280
    },
    username: {
      type: String,
      required: [true, msdUsername]
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    }
  },
  {
    toJSON: {
      getters: true
    },
    id: false
  }
);



//Thoughts is the parent document -> reactions are nested in the thoughts document
const ThoughtsSchema = new Schema(
  {
    username: {
      type: String,
      required: [true,'username is required'],
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
      get: createdAtVal => dateFormat(createdAtVal)
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



ThoughtsSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thoughts = model('Thoughts', ThoughtsSchema);

module.exports = Thoughts;

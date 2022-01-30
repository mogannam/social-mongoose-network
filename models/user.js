const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const msgValidEmail = 'Please fill a valid email address';

var validateEmail = function(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

const UserSchema = new Schema(
  {
    username: {
      type: String,
      trim:true,
      unique: true,
      required: [true, 'username is required'],
    },
    email : {
        type: String,
        required:[true, msgValidEmail],
        trim:true,
        unique: true,
        // validate email and mactch do the same thing. Match is a built in function validating on a regex
        // the other is a custom method used with a function.
        validate: [validateEmail, msgValidEmail],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, msgValidEmail]
    },
    thoughts : {
        type: Array, // array of ID  refrencing thoughts module
    },
    friends : {
        type : [] // array of ID refrencing the user model (self-refrence/its own module)
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    },
  },

  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false
  }
);

// get total count of comments and replies on retrieval
UserSchema.virtual('friendCount').get(function() {
  return this.friends.reduce(
    () => friend.length
  );
});

const User = model('User', UserSchema);

module.exports = User;

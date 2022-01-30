
const express = require('express');
const mongoose = require('mongoose');


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// my app does not have a front end to host public html files
// but it will host public api calls
app.use(express.static('public')); 


const dbName = 'social-mongoose-network'
mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost:27017/${dbName}`, {
  //useFindAndModify: false, // older versions of mongoose do not have this function
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Use this to log mongo queries being executed!
mongoose.set('debug', true);


app.use(require('./routes'));

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));


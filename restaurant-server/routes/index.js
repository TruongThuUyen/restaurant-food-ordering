var express = require('express');
require('dotenv').config();
var router = express.Router();

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const commentSchema = new mongoose.Schema({
  name: String,
  email: String,
  movie_id: String,
  text: String,
  date: Date,
});

const Comment = mongoose.model('comments', commentSchema);

/* GET home page. */
router.get('/', async (req, res) => {
  try {
    const comments = await Comment.find(); //get all
    res.json(comments); // return an json
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error when get comments' });
  }
});
module.exports = router;

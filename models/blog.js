var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ihappy');

var blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  content: String,
  comments: [{
    content: String,
    date: Date
  }],
  date: { type: Date, default: Date.now },
  status: { type: String, default: 'publish' },
  meta: []
});

var BlogModel = mongoose.model('Blog', blogSchema);

module.exports = BlogModel;
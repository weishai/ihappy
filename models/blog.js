var mongoose = require('mongoose')
  , CounterModel = require('../models/counter.js')
mongoose.connect('mongodb://localhost/ihappy');

var blogSchema = new mongoose.Schema({
  post_id: Number,
  title: String,
  author: String,
  excerpt: String,
  content: String,
  comments: [{
    content: String,
    date: Date
  }],
  date: { type: Date, default: Date.now },
  status: { type: String, default: 'publish' },
  meta: []
});

blogSchema.pre('save', function (next) {
  var self = this
  CounterModel.increment('blog', function (err, res) {
    if(err){
      return next(err)
    }
    self.post_id = res.count
    next()
  })
})

var BlogModel = mongoose.model('Blog', blogSchema);

module.exports = BlogModel;
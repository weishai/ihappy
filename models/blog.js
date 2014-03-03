var mongoose = require('mongoose')
  , CounterModel = require('../models/counter.js')
  , xss = require('xss')
mongoose.connect('mongodb://localhost/ihappy');

var xssOptions = {
  whiteList: {
    h1:     [],
    h2:     [],
    h3:     [],
    h4:     [],
    h5:     [],
    h6:     [],
    hr:     ['style'],
    span:   ['style'],
    strong: ['style'],
    b:      ['style'],
    i:      ['style'],
    br:     ['style'],
    p:      ['style'],
    pre:    ['style'],
    code:   ['style'],
    a:      ['target', 'href', 'title', 'style'],
    img:    ['src', 'alt', 'title', 'width', 'height', 'style'],
    div:    ['style'],
    table:  ['width', 'border', 'style'],
    tr:     ['rowspan', 'style'],
    td:     ['width', 'colspan', 'style'],
    th:     ['width', 'colspan', 'style'],
    tbody:  ['style'],
    thead:  ['style'],
    ul:     ['style'],
    li:     ['style'],
    ol:     ['style'],
    dl:     ['style'],
    dt:     ['style'],
    em:     ['style'],
    cite:   ['style'],
    section:['style'],
    header: ['style'],
    footer: ['style'],
    blockquote: ['style'],
    audio:  ['autoplay', 'controls', 'loop', 'preload', 'src', 'style'],
    video:  ['autoplay', 'controls', 'loop', 'preload', 'src', 'height', 'width', 'style']
  }
};

var blogXss = new xss.FilterXSS(xssOptions);

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
    self.title = blogXss.process(self.title)
    self.content = blogXss.process(self.content)
    self.excerpt = blogXss.process(self.excerpt)
    next()
  })
})

var BlogModel = mongoose.model('Blog', blogSchema);

module.exports = BlogModel;
define(function(require, exports, module) {
  require('plugins/arttemplate/arttemplate.js')
  var $ = require('jquery')

  template.openTag = "<?";
  template.closeTag = "?>";

  var Blog = function () {
    this.postBlogUri = '/api/postblog'
    this.getBlogUri = '/api/getblog'
  }
  Blog.prototype.postBlog = function (cb) {}
  Blog.prototype.getBlog = function (cb) {

  }
  Blog.prototype.showList = function () {
    var self = this
      , postListHtml = null

    $.get(self.getBlogUri, function (d) {
      if(d.result){
        postListHtml = template.render('postTmp', d)
        $('#postsList .article').html(postListHtml)
      }
    })
  }

  module.exports = Blog

})
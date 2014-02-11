define(function(require, exports, module) {
  require('plugins/arttemplate/arttemplate.js')
  require('plugins/codemirror/runmode.js')
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
        for (var i = 0; i < d.data.length; i++) {
          if(!d.data[i].content){
            continue
          }
          var cH = ''
          CodeMirror.runMode(d.data[i].content, "application/xml", function (text) {
            console.log(text);
            cH += '<p>' + self.escapeHtml(text) +'</p>'
          })
          d.data[i].content = cH
        }
        postListHtml = template.render('postTmp', d)
        $('#postsList .article').html(postListHtml)
      }
    })
  }
  Blog.prototype.escapeHtml = function (html){
    var elem = document.createElement('div')
      , txt = document.createTextNode(html)
    elem.appendChild(txt)
    return elem.innerHTML;
  }

  module.exports = Blog

})
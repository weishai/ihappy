define(function(require, exports, module) {
  require('plugins/arttemplate/arttemplate.js')
  // require('plugins/codemirror/runmode.js')
  require('plugins/bootstrap/bootstrap.min.js')
  var $ = require('jquery')

  template.openTag = "<?";
  template.closeTag = "?>";

  var Blog = function () {
    this.postBlogUri = location.origin + '/api/postblog'
    this.getBlogUri = location.origin + '/api/getblog'
    this.deleteBlogUri = location.origin + '/api/deleteblog'
    this.bindEvent()
  }
  Blog.prototype.postBlog = function (cb) {}
  Blog.prototype.getBlog = function (cb) {}
  Blog.prototype.showList = function () {
    var self = this
      , postListHtml = null

    $.get(self.getBlogUri, function (d) {
      if(d.result){
        // for (var i = 0; i < d.data.length; i++) {
        //   if(!d.data[i].content){
        //     continue
        //   }
        //   var cH = ''
        //   CodeMirror.runMode(d.data[i].content, "application/xml", function (text) {
        //     console.log(text);
        //     cH += '<p>' + self.escapeHtml(text) +'</p>'
        //   })
        //   d.data[i].content = cH
        // }
        postListHtml = template.render('postTmp', d)
        $('#postsList .article').html(postListHtml)
        window.history.pushState({},0,location.origin)
      }
    })
  }
  Blog.prototype.escapeHtml = function (html){
    var elem = document.createElement('div')
      , txt = document.createTextNode(html)
    elem.appendChild(txt)
    return elem.innerHTML;
  }
  Blog.prototype.bindEvent = function () {
    var self = this
    console.log($('#postsList .post-control .ibtn-remove'))
    $('#postsList .post-control .ibtn-remove').popover({
      placement:'bottom',
      content:'<div class="btn-group"><button class="btn btn-mini" data-action="remove-post">确定</button><button class="btn btn-mini btn-dark">取消</button></div>',
      html:true,
      trigger: 'manual'
    })
    $('#postsList .post-control')
      .on('click', '.ibtn-remove', function(e) {
        $(this).addClass('ibtn-active').popover('show')
        e.preventDefault()
      })
      .on('click', '.popover [data-action="remove-post"]', function (e) {
        var $curPost = $(this).closest('.post')
          , postId = $curPost.data('postid') || $curPost.attr('id').replace(/^post-/, '')

        console.log(postId)
        $.post(self.deleteBlogUri, {postId: postId}, function (d) {
          if(d.result){
            self.showList()
          }
          else{
            alert(postId+' delete bad: '+d.msg)
          }
        })
        e.preventDefault()
      })
  }

  module.exports = Blog

})
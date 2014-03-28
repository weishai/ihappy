define(function(require, exports, module) {
  require('plugins/arttemplate/arttemplate.js')
  // require('plugins/codemirror/runmode.js')
  require('plugins/bootstrap/bootstrap.min.js')
  var $ = require('jquery')

  template.openTag = "<?";
  template.closeTag = "?>";
  template.helper('blogdate', function (d) {
    var curDate = {}
    curDate.base = new Date(d)
    curDate.yy = curDate.base.getFullYear()
    curDate.mm = curDate.base.getMonth() + 1
    curDate.dd = curDate.base.getDate()
    return curDate.yy+'-'+curDate.mm+'-'+curDate.dd
  })

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
  Blog.prototype.getExcerpt = function (str) {
    var strAry = $('<div>'+str+'</div>').contents()
      , $p1 = strAry[0].nodeType == 1 ? $(strAry[0]) : $('<p>'+strAry[0].nodeValue+'</p>')
      , $p2 = null

    if( $p1.text().length > 260){
      if($p1.text().length < 520){
        return $p1
      }
      else{
        return '<p>' + $p1.text().substr(0, 516) + '...</p>'
      }
    }
    if(strAry.length < 2){
      return $p1[0].outerHTML
    }
    else{
      $p2 = strAry[1].nodeType == 1 ? $(strAry[1]) : $('<p>'+strAry[1]+'</p>')
      if($p2.text().length > 260){
        $p2 = '<p>' + $p2.text().substr(0, 516) + '...</p>'
        $p2 = $($p2)
      }
      return $p1[0].outerHTML + $p2[0].outerHTML
    }
  }
  Blog.prototype.bindEvent = function () {
    var self = this
      , $ibtnRemove = $('#postsList .post-control .ibtn-remove')

    $ibtnRemove.popover({
      placement:'bottom',
      content:'<div class="btn-group"><button class="btn btn-mini" data-action="remove-post">确定</button><button class="btn btn-mini btn-dark" data-action="remove-cancel">取消</button></div>',
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
      .on('click', '.popover [data-action="remove-cancel"]', function (e) {
        $ibtnRemove.removeClass('ibtn-active').popover('hide')
        e.preventDefault()
      })
  }

  module.exports = Blog

})
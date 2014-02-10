define(function(require, exports, module) {
  console.log('create.js module start')
  require('plugins/codemirror/codemirror.js')
  require('pluginsCss/codemirror/codemirror.css')
  require('pluginsCss/codemirror/writingTheme.css')

  var $ = require('jquery')
    , Blog = require('ihappy/blog.js')
    , myBlog = new Blog()

  var createBox = function (element, options) {
    this.$element = element
    this.$btnCreate = options.btnCreate
    this.$btnClose = options.btnClose || this.$element.find('.addform-header .btn-close')
    this.bindEvent()
    this.addformEditor = CodeMirror($('#addformEditor')[0],{
      lineWrapping: true
    })
  }
  createBox.prototype.open = function () {
    var self = this
    $('#topNav').addClass('nav-hide')
    this.$element.show(330, function() {
      $(this).find('.addform-header')
        .addClass('addform-header-active')
        .find('.btn-close')
        .addClass('btn-close-active')
      $(this).find('input').focus();
    });
  }
  createBox.prototype.close = function () {
    this.$element.find('.btn-close').removeClass('btn-close-active')
    this.$element.hide(330, function () {
      $(this).find('.addform-header')
        .removeClass('addform-header-active')
      $('#topNav').removeClass('nav-hide')
    })
  }
  createBox.prototype.bindEvent = function () {
    var self = this
    this.$btnCreate.on('click', function(e) {
      self.open()
      return false
    })
    this.$btnClose.on('click', function () {
      self.close()
      return false
    })
    this.$element.on('click', '.addform .btn-submit', function () {
      var postData = null
      self.$element.find('input[name=content]').val(self.addformEditor.doc.getValue('<br/>'))
      postData = $(this).closest('.addform').serialize()
      $.post('/api/postblog', postData, function (d) {
        if(d.result){
          self.close()
          myBlog.showList()
        }
      })
      return false
    })
  }

  var ihappyCreate = new createBox($('#createBox'), {
    btnCreate: $('#btnCreate')
  })

  myBlog.showList()

})
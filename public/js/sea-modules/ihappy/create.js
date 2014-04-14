define(function(require, exports, module) {
  console.log('create.js module start')
  require('plugins/codemirror/codemirror.js')
  require('pluginsCss/codemirror/codemirror.css')
  require('plugins/codemirror/mode/xml.js')
  require('plugins/codemirror/mode/htmlmixed.js')
  // require('pluginsCss/codemirror/writingTheme.css')
  require('plugins/pen/pen.js')
  require('pluginsCss/pen/pen.css')

  var $ = require('jquery')
    , Blog = require('ihappy/blog.js')
    , myBlog = new Blog()

  var createBox = function (element, options) {
    this.$element = element
    this.$btnCreate = options.btnCreate
    this.$btnClose = options.btnClose || this.$element.find('.addform-header .btn-close')
    this.bindEvent()
    this.addformEditor = new Pen({
      editor: $('#addformEditor')[0],
      list: [
        'p', 'blockquote', 'h2', 'h3', 'insertorderedlist', 'insertunorderedlist','indent', 'outdent', 'bold', 'italic', 'pre', 'createlink'
      ],
      stay: false
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
    this.$element.find('.addform-header input[name=title]').val('')
    this.$element.find('.addform-body .editor').html('')
    this.addformEditor.rebuild()
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
      var postData = {}

      // self.$element.find('input[name=content]').val(self.addformEditor.doc.getValue())
      // postData = $(this).closest('.addform').serialize()
      postData.title = self.$element.find('input[name=title]').val()
      postData.content = self.$element.find('#addformEditor').html()
      postData.excerpt = myBlog.getExcerpt(postData.content)

      $.post('/api/postblog', postData, function (d) {
        if(d.result){
          self.close()
          myBlog.showList()
        }
      })
      return false
    })
    this.$element.find('#btnNavCode').on('click', function (e) {
      if($(this).hasClass('nav-btn-active')){
        $(this).removeClass('nav-btn-active')
        $(this).closest('.tab-nav').find('.codebar').removeClass('codebar-active')
        $('#btnAnything').click()
      }
      else{
        $(this).addClass('nav-btn-active')
        $(this).closest('.tab-nav').find('.codebar').addClass('codebar-active')
          .find('>li >a').eq(0).click()
      }
      e.preventDefault()
    })
    this.$element.on('click', '.codebar > li > a', function () {
      $('#btnAnything').removeClass('nav-btn-active')
    })
    this.$element.find('#btnAnything').on('click', function () {
      $(this).addClass('nav-btn-active')
      self.$element.find('.codebar > li.active').removeClass('active')
    })
    self.$element.find('.codebar [data-toggle="tab"]').on('shown.bs.tab', function () {
      var targetEditor = $(this).data('target').replace(/^#/, '')
      if(!self[targetEditor]){
        console.log(targetEditor)
        self[targetEditor] = CodeMirror($('#'+targetEditor)[0],{
          lineNumbers: true,
          mode: 'text/html'
        })
      }
    })
  }

  var ihappyCreate = new createBox($('#createBox'), {
    btnCreate: $('#btnCreate')
  })

console.log($('#postTmp').data('initpage'));
  if($('#postTmp').data('initpage')){
    myBlog.showList()
  }

})
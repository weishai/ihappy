define(function(require, exports, module) {
  console.log('create.js module start')
  var $ = require('jquery')

  var createBox = function (element, options) {
    this.$element = element
    this.$btnCreate = options.btnCreate
    this.bindEvent()
  }
  createBox.prototype.open = function () {
    $('#topNav').addClass('nav-hide')
    this.$element.show(function () {
      $(this).addClass('create-box-active')
    })
  },
  createBox.prototype.close =function () {

  },
  createBox.prototype.bindEvent = function () {
    var self = this
    this.$btnCreate.on('click', function(e) {
      self.open()
      return false
    })
  }

  var ihappyCreate = new createBox($('#createBox'), {
    btnCreate: $('#btnCreate')
  })
})
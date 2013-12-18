define(function(require, exports, module) {
  console.log('create.js module start')
  require('ihappy/transition-support')
  var $ = require('jquery')

  var createBox = function (element, options) {
    this.$element = element
    this.$btnCreate = options.btnCreate
    this.bindEvent()
  }
  createBox.prototype.open = function () {
    var self = this
    $('#topNav').addClass('nav-hide')
    this.$element.show(330, function() {
      $(this).find('.addform-header')
        .addClass('addform-header-active')
        // .one($.support.transition.end, function () {
        //   $(this).find('input').focus();
        // })
      $(this).find('input').focus();
      console.log($.support.transition.end);
    });
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
/* Counter Init
 * -------------------------------------------------- */

var mongoose = require('mongoose')
  , CounterModel = require('../models/counter.js')

CounterModel.findOne({_id: 'blog'}, function (err, res) {
  if(err){
    CounterModel.create({_id: 'blog', count: 1}, function (err) {
      if(err){
        console.log('Init blog Counter bad.')
      }
    })
  }
})
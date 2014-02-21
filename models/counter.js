var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/ihappy');

var counterSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    index: {unique: true}
  },
  count: {type: Number, required: true, default: 1}
});

counterSchema.statics.increment = function (modelName, cb) {
  return this.findOneAndUpdate( {_id: modelName}, {$inc: {count:1} }, {new: true}, cb )
}

var CounterModel = mongoose.model('Counter', counterSchema);

module.exports = CounterModel;
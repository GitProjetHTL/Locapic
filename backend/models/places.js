const mongoose = require('mongoose');

const PlacesSchema = mongoose.Schema({
  nickname: String,
  name: String,
  latitude: Number,
  longitude: Number,
});

const Places = mongoose.model('places', PlacesSchema);

module.exports = Places;
const mongoose = require('mongoose');

const electricVehicleSchema = new mongoose.Schema({
  licensePlate: String,
  make: String,
  VIN: String,
  model: String,
  type: String,
  date: Date,
  milesDriven: Number,
});

module.exports = mongoose.model('datasets', electricVehicleSchema);

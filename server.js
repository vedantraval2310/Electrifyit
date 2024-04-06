const express = require('express');
const mongoose = require('mongoose');
const app = express();
const ejs = require('ejs');
const { kStringMaxLength } = require('buffer');

app.set('view engine', 'ejs');

const mongoURI = 'mongodb://localhost:27017/Electrifyit';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB', err));

  const electricVehicleSchema = new mongoose.Schema({
    licensePlate: String,
    make: String,
    VIN: String,
    model: String,
    type: String,
    date: Date,
    milesDriven: Number,
  });
  
  const ElectricVehicleData = mongoose.model('datasets', electricVehicleSchema);

app.get('/', async (req, res) => {
    try {
        const datas = await ElectricVehicleData.find({});
        res.render('index', { Electricdatas: datas });
      } catch (err) {
        // Handle errors gracefully, e.g., log the error and render an error page
        console.error('Error fetching data:', err);
        res.status(500).render('error'); // Render a generic error page
      }
});
app.get('/')

app.listen(4000, function() {
    console.log('server is running');
})

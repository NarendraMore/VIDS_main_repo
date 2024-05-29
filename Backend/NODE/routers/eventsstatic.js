const express = require('express');
const EventsStatic = require('../models/eventsstatic');
const router = new express.Router()
const moment = require('moment');

//get api 
// // get in descending order
// router.get('/eventStatics', (req, res) => {
//     EventsStatic.find()
//       .sort({ date: -1, time: -1 }) 
//       .then(result => {
//         res.status(200).json(result);
//       })
//       .catch(err => {
//         console.log(err);
//         res.status(500).json({
//           error: err
//         });
//       });
//   });

 
//get by date and cameratype
router.get('/eventStatics', async (req, res) => {
    const currentDate = moment().format('DD/MM/YYYY');
  console.log(currentDate);
    try {
      // Fetch data for the current date
      const result = await EventsStatic.find({ date: currentDate }).sort({ time: -1 });
  console.log(result);
      res.status(200).json(result);
    } catch (err) {
      console.error('Error fetching data:', err);
      res.status(500).json({ error: err });
    }
  });
  
  // Periodically refresh data every 10 seconds
  setInterval(async () => {
    try {
      const currentDate = moment().format('YYYY-MM-DD');
      const result = await EventsStatic.find({ date: currentDate }).sort({ time: -1 });
      console.log('Data refreshed at', moment().format('YYYY-MM-DD HH:mm:ss'));
    } catch (err) {
      console.error('Error refreshing data:', err);
    }
  }, 10000);;
  
  //----------------------------------------------------------------------//
  // get in descending order based on timestamp
  router.get('/eventStatics', async (req, res) => {
    try {
      // Fetch data for the current date
      const currentTimestamp = moment().toISOString();
      console.log('Current Timestamp:', currentTimestamp);
  
      const result = await EventsStatic.find({ timestamp: { $lte: currentTimestamp } })
        .sort({ timestamp: -1 })
        .exec();  
      console.log('Fetched Data:', result);
      res.status(200).json(result);
    } catch (err) {
      console.error('Error fetching data:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Periodically refresh data every 5 seconds
  setInterval(async () => {
    try {
      const currentTimestamp = moment().toISOString();
      console.log('Refreshing Data at', moment().format('YYYY-MM-DD HH:mm:ss'));
  
      const result = await EventsStatic.find({ timestamp: { $lte: currentTimestamp } })
        .sort({ timestamp: -1 })
        .exec();
  
      console.log('Refreshed Data:', result);
    } catch (err) {
      console.error('Error refreshing data:', err);
    }
  }, 5000);

  module.exports = router
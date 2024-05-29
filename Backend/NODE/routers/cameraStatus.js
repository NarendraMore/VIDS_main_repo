const express = require('express')
const router = new express.Router()
const CameraStatus = require('../models/cameraStatus')
const PDFDocument = require('pdfkit');
const ffmpeg = require('fluent-ffmpeg');
// const ffmpegPath = 'C:/ffmpeg/bin/ffmpeg.exe'; 
// ffmpeg.setFfmpegPath(ffmpegPath);

// router.post('/cameraStatus', async (req, res) => {
//   try {
//       const cameraStatus = new CameraStatus({
//     srNo:req.body.srNo,
//     name: req.body.name,
//     ipAddress: req.body.ipAddress,
//     location:req.body.location,
//     status:req.body.status
//       });

//       const result = await cameraStatus.save();
//       res.status(200).json(result);
//   } catch (err) {
//       res.status(500).json({
//           error: err.message
//       });
//   }
// });


// GET API endpoint
router.get('/cameraStatus', (req, res) => {
  // Fetch the data
  CameraStatus.find()
    .then(result => {
      // Send the data in the response
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

//-----------------get data with stream-----------------//
// GET API endpoint for streaming
router.get('/streams', (req, res) => {
  const streamStatus = {};

  CameraStatus.find()
      .then(cameraStatusList => {
          cameraStatusList.forEach((cameraStatus, index) => {
              const streamUrl = cameraStatus.stream;
              streamStatus[`Camera${index + 1}`] = streamUrl;
              console.log(streamUrl);
          });

          res.json({ message: 'Camera Streaming URLs', streamStatus });
      })
      .catch(err => {
          console.log('Error fetching camera streams:', err);
          res.status(500).json({ error: err });
      });
});



//**************Download api***************/
router.get('/downloadMachineStatus', async (req, res) => {
    const { startDate, endDate } = req.query;
  
    try {
      // Fetch data from MongoDB collections based on date criteria
      const dataFromModel = await MachineStatus.find({
        date: { $gte: startDate, $lte: endDate },
      });
      
  
      // Generate PDF document
      const pdfDoc = new PDFDocument();
      pdfDoc.pipe(res);
  
      // Add data to the PDF
      pdfDoc.text('Data from model');
      pdfDoc.text(JSON.stringify(dataFromModel));
      
  
      // End the PDF stream and send it as a response
      pdfDoc.end();
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while generating the PDF' });
    }
  });


  // router.get('/cameraStatus', async (req, res) => {
  //   try {
  //     // Fetch the latest 5 entries
  //     const latestEntries = await CameraStatus.find().sort({ _id: -1 }).limit(5);
  
  //     // Send the data in the response
  //     res.status(200).json(latestEntries);
  //   } catch (err) {
  //     console.log(err);
  //     res.status(500).json({
  //       error: err
  //     });
  //   }
  // });
  
  // // Fetch the latest 5 entries every 16 minutes
  // setInterval(updateLatestEntries, 16 * 60 * 1000);
  
  // async function updateLatestEntries() {
  //   try {
  //     // Fetch the latest 5 entries 
  //     const latestEntries = await CameraStatus.find().sort({ _id: -1 }).limit(5);
  //     console.log('Latest entries:', latestEntries);
  //   } catch (err) {
  //     console.error('Error fetching latest entries:', err);
  //   }
  // }

module.exports = router
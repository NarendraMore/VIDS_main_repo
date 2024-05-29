const express = require('express');
const router = new express.Router()
const Bookmark = require('../models/bookmark');
const Events = require('../models/events')
// const mime = require('mime');
const fs = require('fs'); 
const mimeTypes = require('mime-types');
const shortid = require('shortid');

// //post api 
// router.post('/bookmark', async (req, res) => {
//     try {
//         const bookmark = new Bookmark({
//       eventId:req.body.eventId,
//       event:req.body.event,
//       date:req.body.date,
//       time:req.body.time,
//       cameratype:req.body.cameratype,
//       location:req.body.location,
//       imagepath:req.body.imagepath,
//       videopath:req.body.videopath,
//       assignBy:req.body.assignBy,
//       note:req.body.note
//         });
  
//         const result = await bookmark.save();
//         res.status(200).json(result);
//     } catch (err) {
//         res.status(500).json({
//             error: err.message
//         });
//     }
//   });


// router.post('/bookmark', async (req, res) => {
//   try {
//     const eventId = req.body.eventId;
//     const imagePath = req.body.imagepath;

//     const bookmark = new Bookmark({
//       eventId: eventId,
//       event: req.body.event,
//       date: req.body.date,
//       time: req.body.time,
//       cameratype: req.body.cameratype,
//       location: req.body.location,
//       imagepath: req.body.imagepath,
//       videopath: req.body.videopath,
//       assignBy: req.body.assignBy,
//       note: req.body.note,
//       // Use the eventId as part of the shortImageUrl
//       imageUrl: `http://localhost:3000/getLatestImage/${eventId}`,
//       status: true,
//     });

//     const result = await bookmark.save();
//     res.status(200).json(result);
//   } catch (err) {
//     res.status(500).json({
//       error: err.message
//     });
//   }
// });
router.post('/bookmark', async (req, res) => {
  try {
    const eventId = req.body.eventId;

    // Check if eventId already exists in the Bookmark collection
    const existingBookmark = await Bookmark.findOne({ eventId: eventId });

    if (existingBookmark) {
      console.log("=============================================> Bookmark Failed");
      return res.status(400).json({ error: 'Event with the same eventId already exists in bookmarks.' });
    }

    const bookmark = new Bookmark({
      eventId: eventId,
      event: req.body.event,
      date: req.body.date,
      time: req.body.time,
      timestamp:req.body.timestamp,
      cameratype: req.body.cameratype,
      location: req.body.location,
      imagepath: req.body.imagepath,
      videopath: req.body.videopath,
      assignBy: req.body.assignBy,
      note: req.body.note,
      // Use the eventId as part of the shortImageUrl
      imageUrl: `http://localhost:3000/getLatestImage/${eventId}`,
      status: true,
    });

    const result = await bookmark.save();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});


//get api 
// get in descending order
router.get('/getAllBookmark', (req, res) => {
  Bookmark.find()
    // .sort({ date: -1, time: -1 }) 
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

// // Get a bookmark by ID
// router.get('/bookmark/:id', (req, res) => {
//   const bookmarkId = req.params.id;

//   Bookmark.findById(bookmarkId)
//     .then(bookmark => {
//       if (!bookmark) {
//         return res.status(404).json({ message: 'Bookmark not found' });
//       }

//       res.status(200).json(bookmark);
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({
//         error: err
//       });
//     });
// });

// Get a bookmark by latestevent ID
router.get('/getBookmark/:eventId', (req, res) => {
  const eventId = req.params.eventId;

  Bookmark.find({ eventId: eventId })
  .sort({ date: -1, time: -1 }) 
    .then(bookmarks => {
      if (!bookmarks || bookmarks.length === 0) {
        return res.status(200).json({ message: 'Bookmarks not found' });
      }
      res.status(200).json(bookmarks);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});


// Delete all bookmarks
router.delete('/deleteAllBookmark', (req, res) => {
    Bookmark.deleteMany({})
      .then(result => {
        res.status(200).json({ message: 'All bookmarks deleted successfully' });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });

// Delete a bookmark by ID
router.delete('/deleteBookmark/:id', (req, res) => {
    const bookmarkId = req.params.id;
  
    Bookmark.findByIdAndDelete(bookmarkId)
      .then(deletedBookmark => {
        if (!deletedBookmark) {
          return res.status(404).json({ message: 'Bookmark not found' });
        }
  
        res.status(200).json({ message: 'Bookmark deleted successfully' });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });

  module.exports = router
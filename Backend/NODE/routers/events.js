const express = require("express");
const router = new express.Router();
const Events = require("../models/events");
const path = require("path");
const fs = require("fs");
const mime = require("mime-types");
const PDFDocument = require("pdfkit");
const mongoose = require('mongoose')
const moment = require('moment')

// // get all latestevents in descending order with pagination
// router.get("/latestevents", async (req, res) => {
//   const page = parseInt(req.query.page) || 1;
//   const limit = parseInt(req.query.limit) || 10;

//   try {
//     const totalItems = await Events.countDocuments();
//     const totalPages = Math.ceil(totalItems / limit);

//     const result = await Events.find()
//       .sort({ date: -1, time: -1 })
//       .skip((page - 1) * limit)
//       .limit(limit)

//     res.status(200).json({
//       totalItems,
//       totalPages,
//       currentPage: page,
//       latestEvents: result,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       error: err.message,
//     });
//   }
// });


// router.get("/latestevents", async (req, res) => {
//   const page = parseInt(req.query.page) || 1;
//   const limit = parseInt(req.query.limit) || 10;

//   try {
//     const totalItems = await Events.countDocuments();
//     const totalPages = Math.ceil(totalItems / limit);

//     const result = await Events.aggregate([
//       {
//         $project: {
//           date: {
//             $dateFromString: {
//               dateString: '$date',
//               format: '%d/%m/%Y',
//             },
//           },
//           time: 1,
//           event: 1,
//           cameratype: 1,
//           location: 1,
//           imagepath: 1,
//           videopath: 1,
//           status: 1,
//         },
//       },
//       { $sort: { date: -1, time: -1 } },
//       { $skip: (page - 1) * limit },
//       { $limit: limit },
//     ]);

//     res.status(200).json({
//       totalItems,
//       totalPages,
//       currentPage: page,
//       latestEvents: result,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       error: err.message,
//     });
//   }
// });

//Add bookmark true or false-----------------------//
router.get("/latestevents", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const totalItems = await Events.countDocuments();
    const totalPages = Math.ceil(totalItems / limit);

    const result = await Events.aggregate([
      {
        $project: {
          date: {
            $dateFromString: {
              dateString: '$date',
              format: '%d/%m/%Y',
            },
          },
          time: 1, // Include other fields as needed
          event: 1,
          cameratype: 1,
          location: 1,
          imagepath: 1,
          videopath: 1,
          status: 1
          // Include other fields you need in the result
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [
              "$$ROOT",
              {
                imagepath: {
                  $concat: [
                    "D:/VIDS",
                    {
                      $substrCP: [
                        { $replaceAll: { input: "$imagepath", find: "\\", replacement: "/" } },
                        21, // starting index
                        { $subtract: [{ $strLenCP: { $replaceAll: { input: "$imagepath", find: "\\", replacement: "/" } } }, 21] } // length
                      ]
                    }
                  ]
                },
                videopath: {
                  $concat: [
                    "D:/VIDS",
                    {
                      $substrCP: [
                        {
                          $replaceAll: {
                            input: {
                              $replaceAll: { input: "$videopath", find: "\\", replacement: "/" }
                            },
                            find: "/detected.mp4",
                            replacement: ""
                          }
                        },
                        21, // starting index
                        {
                          $subtract: [
                            {
                              $strLenCP: {
                                $replaceAll: {
                                  input: { $replaceAll: { input: "$videopath", find: "\\", replacement: "/" } },
                                  find: "/detected.mp4",
                                  replacement: ""
                                }
                              }
                            },
                            21
                          ]
                        } // length
                      ]
                    }
                  ]
                }
              }
            ]
          }
        }
      },
      {
        $lookup: {
          from: "bookmarks",
          localField: "_id",
          foreignField: "eventId",
          as: "matchingBookmarks"
        }
      },
      {
        $addFields: {
          bookmarked: { $gt: [{ $size: "$matchingBookmarks" }, 0] }
        }
      },
      {
        $project: {
          matchingBookmarks: 0
        }
      },            
      { $sort: { date: -1, time: -1, timestamp: -1 } }, 
      { $skip: (page - 1) * limit },
      { $limit: limit },
    ]);

    res.status(200).json({
      totalItems,
      totalPages,
      currentPage: page,
      latestEvents: result,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err.message,
    });
  }
});


router.get("/latesteventsNew", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const totalItems = await Events.countDocuments();
    const totalPages = Math.ceil(totalItems / limit);

    const result = await Events.aggregate([
      {
        $sort: { timestamp: -1 }
      },
      {
        $skip: (page - 1) * limit
      },
      {
        $limit: limit
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [
              "$$ROOT",
              {
                imagepath: {
                  $concat: [
                    "D:/VIDS",
                    {
                      $substrCP: [
                        { $replaceAll: { input: "$imagepath", find: "\\", replacement: "/" } },
                        21, // starting index
                        { $subtract: [{ $strLenCP: { $replaceAll: { input: "$imagepath", find: "\\", replacement: "/" } } }, 21] } // length
                      ]
                    }
                  ]
                },
                videopath: {
                  $concat: [
                    "D:/VIDS",
                    {
                      $substrCP: [
                        {
                          $replaceAll: {
                            input: {
                              $replaceAll: { input: "$videopath", find: "\\", replacement: "/" }
                            },
                            find: "/detected.mp4",
                            replacement: ""
                          }
                        },
                        21, // starting index
                        {
                          $subtract: [
                            {
                              $strLenCP: {
                                $replaceAll: {
                                  input: { $replaceAll: { input: "$videopath", find: "\\", replacement: "/" } },
                                  find: "/detected.mp4",
                                  replacement: ""
                                }
                              }
                            },
                            21
                          ]
                        } // length
                      ]
                    }
                  ]
                }
              }
            ]
          }
        }
      },
      {
        $lookup: {
          from: "bookmarks",
          localField: "_id",
          foreignField: "eventId",
          as: "matchingBookmarks"
        }
      },
      {
        $addFields: {
          bookmarked: { $gt: [{ $size: "$matchingBookmarks" }, 0] }
        }
      },
      {
        $project: {
          matchingBookmarks: 0
        }
      }
    ]);
    res.status(200).json({
      totalItems,
      totalPages,
      currentPage: page,
      latestEvents: result,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err.message,
    });
  }
});
//---------------------------------------------------



//-------------------get data by event---------------------
router.get("/latestevents/:event", async (req, res) => {
  const event = req.params.event;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const aggregationPipeline = [
      {
        $match: {
          event: event,
        },
      },
      {
        $project: {
          date: {
            $dateFromString: {
              dateString: '$date',
              format: '%d/%m/%Y',
            },
          },
          time: 1, // Include other fields as needed
          event: 1,
          cameratype: 1,
          location: 1,
          vehicletype:1,
          imagepath: 1,
          videopath: 1,
          status:1
          // Include other fields you need in the result
        },
      },
      { $sort: { date: -1, time: -1 } },
      { $skip: (page - 1) * limit },
      { $limit: limit },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [
              "$$ROOT",
              {
                imagepath: {
                  $concat: [
                    "D:/VIDS",
                    {
                      $substrCP: [
                        { $replaceAll: { input: "$imagepath", find: "\\", replacement: "/" } },
                        21, // starting index
                        { $subtract: [{ $strLenCP: { $replaceAll: { input: "$imagepath", find: "\\", replacement: "/" } } }, 21] } // length
                      ]
                    }
                  ]
                },
                videopath: {
                  $concat: [
                    "D:/VIDS",
                    {
                      $substrCP: [
                        {
                          $replaceAll: {
                            input: {
                              $replaceAll: { input: "$videopath", find: "\\", replacement: "/" }
                            },
                            find: "detected.mp4",
                            replacement: ""
                          }
                        },
                        21, // starting index
                        {
                          $subtract: [
                            {
                              $strLenCP: {
                                $replaceAll: {
                                  input: { $replaceAll: { input: "$videopath", find: "\\", replacement: "/" } },
                                  find: "detected.mp4",
                                  replacement: ""
                                }
                              }
                            },
                            21
                          ]
                        } // length
                      ]
                    }
                  ]
                }
              }
            ]
          }
        }
      },
    ];

    const [result, totalItems] = await Promise.all([
      Events.aggregate(aggregationPipeline),
      Events.countDocuments({ event: event }),
    ]);

    const totalPages = Math.ceil(totalItems / limit);

    res.status(200).json({
      totalItems,
      totalPages,
      currentPage: page,
      latestEvents: result,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err.message,
    });
  }
});

router.get("/latesteventsNew/:event", async (req, res) => {
  const event = req.params.event;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const query = { event: event };
    const sort = { timestamp: -1 };

    const aggregationPipeline = [
      { $match: query },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [
              "$$ROOT",
              {
                imagepath: {
                  $concat: [
                    "D:/VIDS",
                    {
                      $substrCP: [
                        { $replaceAll: { input: "$imagepath", find: "\\", replacement: "/" } },
                        21,
                        { $subtract: [{ $strLenCP: { $replaceAll: { input: "$imagepath", find: "\\", replacement: "/" } } }, 21] }
                      ]
                    }
                  ]
                },
                videopath: {
                  $concat: [
                    "D:/VIDS",
                    {
                      $substrCP: [
                        {
                          $replaceAll: {
                            input: {
                              $replaceAll: { input: "$videopath", find: "\\", replacement: "/" }
                            },
                            find: "/detected.mp4",
                            replacement: ""
                          }
                        },
                        21,
                        {
                          $subtract: [
                            {
                              $strLenCP: {
                                $replaceAll: {
                                  input: { $replaceAll: { input: "$videopath", find: "\\", replacement: "/" } },
                                  find: "/detected.mp4",
                                  replacement: ""
                                }
                              }
                            },
                            21
                          ]
                        }
                      ]
                    }
                  ]
                }
              }
            ]
          }
        }
      },
      { $sort: sort },
      { $skip: (page - 1) * limit },
      { $limit: limit }
    ];

    const [result, totalItems] = await Promise.all([
      Events.aggregate(aggregationPipeline),
      Events.countDocuments(query),
    ]);

    const totalPages = Math.ceil(totalItems / limit);

    res.status(200).json({
      totalItems,
      totalPages,
      currentPage: page,
      latestEvents: result,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err.message,
    });
  }
});

//***********************Update Action TrueFalse************************ */
router.patch("/latestevents/:id", async (req, res) => {
  const id = req.params.id;
  const { status } = req.body;

  try {
    if (status === "true" || status === "false") {
      const updatedStatus = status === "true";

      const updatedEvent = await Events.findByIdAndUpdate(
        id,
        { status: updatedStatus },
        { new: true }
      );

      if (!updatedEvent) {
        res.status(404).send("Event not found");
      } else {
        res.send(updatedEvent);
      }
    } else {
      res.status(400).send('Invalid status value. Use "true" or "false".');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating events");
  }
});

//*******************************delete api for false event**************************************** */
router.delete("/latestevents/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const deletedEvent = await Events.findByIdAndRemove(id);

    if (!deletedEvent) {
      res.status(404).send("Event not found");
    } else {
      res.send("Event deleted successfully");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting the event");
  }
});

//--------------------get image for all events-------------------
// router.get("/getLatestImage/:id", async (req, res) => {
//   try {
//     const imageData = await Events.findOne({ _id: req.params.id });
//     console.log(imageData);
//     if (!imageData) {
//       res.status(404).send("image data not found");
//       return;
//     }

//     const baseDir = imageData.imagepath;
//     const filePath = path.join(baseDir);

//     fs.stat(filePath, (err, stat) => {
//       if (err || !stat.isFile()) {
//         res.status(404).send("File not found");
//         return;
//       }

//       const contentType = mime.lookup(filePath);
//       const fileStream = fs.createReadStream(filePath);

//       res.setHeader("Content-Type", contentType);
//       res.setHeader(
//         "Content-Disposition",
//         `inline; filename="${path.basename(filePath)}"`
//       );

//       fileStream.pipe(res);
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Server error");
//   }
// });

router.get("/getLatestImage/:id", async (req, res) => {
  try {
    const imageData = await Events.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(req.params.id) } },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [
              "$$ROOT",
              {
                imagepath: {
                  $concat: [
                    "D:/VIDS",
                    {
                      $substrCP: [
                        { $replaceAll: { input: "$imagepath", find: "\\", replacement: "/" } },
                        21,
                        { $subtract: [{ $strLenCP: { $replaceAll: { input: "$imagepath", find: "\\", replacement: "/" } } }, 21] }
                      ]
                    }
                  ]
                },
                videopath: {
                  $concat: [
                    "D:/VIDS",
                    {
                      $substrCP: [
                        {
                          $replaceAll: {
                            input: {
                              $replaceAll: { input: "$videopath", find: "\\", replacement: "/" }
                            },
                            find: "detected.mp4",
                            replacement: ""
                          }
                        },
                        21,
                        {
                          $subtract: [
                            {
                              $strLenCP: {
                                $replaceAll: {
                                  input: { $replaceAll: { input: "$videopath", find: "\\", replacement: "/" } },
                                  find: "detected.mp4",
                                  replacement: ""
                                }
                              }
                            },
                            21
                          ]
                        }
                      ]
                    }
                  ]
                }
              }
            ]
          }
        }
      }
    ]);

    if (!imageData || imageData.length === 0) {
      res.status(404).send("Image data not found");
      return;
    }

    const baseDir = imageData[0].imagepath;
    const filePath = path.join(baseDir);

    fs.stat(filePath, (err, stat) => {
      if (err || !stat.isFile()) {
        res.status(404).send("File not found");
        return;
      }

      const contentType = mime.lookup(filePath);
      const fileStream = fs.createReadStream(filePath);

      res.setHeader("Content-Type", contentType);
      res.setHeader(
        "Content-Disposition",
        `inline; filename="${path.basename(filePath)}"`
      );

      fileStream.pipe(res);
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});


//------------------------ get video for all events-------------------------
// router.get("/playVideo/:id", async (req, res) => {
//   try {
//     const videoData = await Events.findOne({ _id: req.params.id });

//     if (!videoData) {
//       res.status(404).send("Video data not found");
//       return;
//     }

//     const baseDir = videoData.videopath;

//     const videoFileNames = ["detected.mp4", "detected0.mp4", "detected1.mp4"];

//     let currentIndex = 0;

//     if (currentIndex >= videoFileNames.length) {
//       res.status(404).send("All videos played");
//       return;
//     }

//     const mediakey = videoFileNames[currentIndex];
//     const filePath = path.join(baseDir, mediakey);

//     fs.stat(filePath, (err, stat) => {
//       if (err || !stat.isFile()) {
//         res.status(404).send("File not found");
//         return;
//       }

//       const contentType = mime.lookup(filePath);
//       const fileStream = fs.createReadStream(filePath);

//       res.setHeader("Content-Type", contentType);
//       res.setHeader(
//         "Content-Disposition",
//         `inline; filename="${path.basename(filePath)}"`
//       );

//       // Send a success response
//       res.status(200);

//       // Pipe the file stream to the response
//       fileStream.pipe(res);
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Server error");
//   }
// });

router.get("/playVideo/:id", async (req, res) => {
  try {
    const videoData = await Events.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(req.params.id) } },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [
              "$$ROOT",
              {
                imagepath: {
                  $concat: [
                    "D:/VIDS",
                    {
                      $substrCP: [
                        { $replaceAll: { input: "$imagepath", find: "\\", replacement: "/" } },
                        21,
                        { $subtract: [{ $strLenCP: { $replaceAll: { input: "$imagepath", find: "\\", replacement: "/" } } }, 21] }
                      ]
                    }
                  ]
                },
                videopath: {
                  $concat: [
                    "D:/VIDS",
                    {
                      $substrCP: [
                        {
                          $replaceAll: {
                            input: {
                              $replaceAll: { input: "$videopath", find: "\\", replacement: "/" }
                            },
                            find: "detected.mp4",
                            replacement: ""
                          }
                        },
                        21,
                        {
                          $subtract: [
                            {
                              $strLenCP: {
                                $replaceAll: {
                                  input: { $replaceAll: { input: "$videopath", find: "\\", replacement: "/" } },
                                  find: "detected.mp4",
                                  replacement: ""
                                }
                              }
                            },
                            21
                          ]
                        }
                      ]
                    }
                  ]
                }
              }
            ]
          }
        }
      }
    ]);

    if (!videoData || videoData.length === 0) {
      res.status(404).send("Video data not found");
      return;
    }

    const baseDir = videoData[0].videopath;

    const videoFileNames = ["detected.mp4", "detected0.mp4", "detected1.mp4"];

    let currentIndex = 0;

    if (currentIndex >= videoFileNames.length) {
      res.status(404).send("All videos played");
      return;
    }

    const mediakey = videoFileNames[currentIndex];
    const filePath = path.join(baseDir, mediakey);

    fs.stat(filePath, (err, stat) => {
      if (err || !stat.isFile()) {
        res.status(404).send("File not found");
        return;
      }

      const contentType = mime.lookup(filePath);
      const fileStream = fs.createReadStream(filePath);

      res.setHeader("Content-Type", contentType);
      res.setHeader(
        "Content-Disposition",
        `inline; filename="${path.basename(filePath)}"`
      );

      // Send a success response
      res.status(200);

      // Pipe the file stream to the response
      fileStream.pipe(res);
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});


// Updated route definition with a parameter in the URL path
// router.get('/search/:searchValue', async (req, res) => {
//   const searchValue = req.params.searchValue;
//   const timestampParam = req.query.timestamp;
//   const page = parseInt(req.query.page) || 1;
//   const limit = parseInt(req.query.limit) || 10;

//   try {
//     // Use a case-insensitive regex for the search term
//     const regex = new RegExp(searchValue, 'i');

//     const query = {
//       $or: [
//         { event: { $regex: regex } },
//         { cameratype: { $regex: regex } },
//         { location: { $regex: regex } },
//       ],
//     };

//     if (timestampParam) {
//       // Validate and parse the timestamp parameter
//       const timestampToSearch = new Date(timestampParam);
//       if (isNaN(timestampToSearch.getTime())) {
//         return res.status(400).json({ error: 'Invalid timestamp format' });
//       }

//       // Add the timestamp condition to the query
//       query.timestamp = { $eq: timestampToSearch };
//     }

//     const totalItems = await Events.countDocuments(query);

//     const result = await Events.find(query)
//       .skip((page - 1) * limit)
//       .limit(limit);

//     const totalPages = Math.ceil(totalItems / limit);
//     res.status(200).json({
//       totalItems,
//       totalPages,
//       currentPage: page,
//       latestEvents: result,
//     });
//   } catch (error) {
//     console.error('Error executing the query:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// router.get('/search', async (req, res) => {
//   const searchValue = req.query.searchValue; 
//   const dateParam = req.query.date; 
//   const page = parseInt(req.query.page) || 1;
//   const limit = parseInt(req.query.limit) || 10;

//   try {
//     const regex = new RegExp(searchValue, 'i');

//     const query = {
//       $or: [
//         { event: { $regex: regex } },
//         { cameratype: { $regex: regex } },
//         { location: { $regex: regex } },
//       ],
//     };

//     if (dateParam) {
//       const date = new Date(dateParam);
//       if (isNaN(date.getTime())) {
//         return res.status(400).json({ error: 'Invalid date format' });
//       }

//       // Create the start and end of the day
//       const startOfDay = new Date(date.setUTCHours(0, 0, 0, 0));
//       const endOfDay = new Date(date.setUTCHours(23, 59, 59, 999));

//       // Add the date range condition to the query
//       query.timestamp = { $gte: startOfDay, $lte: endOfDay };
//     }

//     const totalItems = await Events.countDocuments(query);

//     const result = await Events.find(query)
//       .skip((page - 1) * limit)
//       .limit(limit);

//     const totalPages = Math.ceil(totalItems / limit);
//     res.status(200).json({
//       totalItems,
//       totalPages,
//       currentPage: page,
//       latestEvents: result,
//     });
//   } catch (error) {
//     console.error('Error executing the query:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

router.get('/search', async (req, res) => {
  const searchValue = req.query.searchValue;
  const dateParam = req.query.date;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const regex = searchValue ? new RegExp(searchValue, 'i') : null;
    const match = {};

    if (regex) {
      match.$or = [
        { event: { $regex: regex } },
        { cameratype: { $regex: regex } },
        { location: { $regex: regex } },
      ];
    }

    const aggregationPipeline = [];

    if (dateParam) {
      const date = moment(dateParam, 'YYYY-MM-DD').toDate();
      if (isNaN(date.getTime())) {
        return res.status(400).json({ error: 'Invalid date format' });
      }

      const startOfDay = moment(date).startOf('day').toDate();
      const endOfDay = moment(date).endOf('day').toDate();

      aggregationPipeline.push(
        {
          $project: {
            event: 1,
            cameratype: 1,
            location: 1,
            timestamp: 1,
            time:1,
            imagepath:1,
            videopath:1,
            date: {
              $dateFromString: {
                dateString: '$date',
                format: '%d/%m/%Y',
              },
            },
          },
        },
        {
          $match: {
            date: { $gte: startOfDay, $lte: endOfDay },
          },
        }
      );
    }

    if (Object.keys(match).length) {
      aggregationPipeline.unshift({ $match: match });
    }

    aggregationPipeline.push(
      { $skip: (page - 1) * limit },
      { $limit: limit }
    );

    const totalItemsPipeline = [...aggregationPipeline];
    totalItemsPipeline.pop(); // Remove the last $limit stage for counting
    totalItemsPipeline.push({ $count: 'totalItems' });

    const [result, totalItemsResult] = await Promise.all([
      Events.aggregate(aggregationPipeline).exec(),
      Events.aggregate(totalItemsPipeline).exec()
    ]);

    const totalItems = totalItemsResult.length > 0 ? totalItemsResult[0].totalItems : 0;
    const totalPages = Math.ceil(totalItems / limit);

    res.status(200).json({
      totalItems,
      totalPages,
      currentPage: page,
      latestEvents: result,
    });
  } catch (error) {
    console.error('Error executing the query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});






//**************************************************************************************************************** */
// Define a route to get all events

router.get('/allEvents', async (req, res) => {
  try {
    const allEvents = await Events.find();
    res.json(allEvents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Define a route to get events from the last 5 minutes
router.get('/latestFiveEvents', async (req, res) => {
  try {
    // Calculate the date 5 minutes ago from the current time
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
console.log(fiveMinutesAgo);
    // Fetch events within the last 5 minutes
    const latestEvents = await Events.find({
      date: { $gte: fiveMinutesAgo.toISOString() },
    });

    res.json(latestEvents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//--------------------Get count of event-------------------//
router.get('/eventCount', async (req, res) => {
  try {
      const result = await Events.aggregate([
          {
              $group: {
                  _id: { event: '$event' },
                  count: { $sum: 1 },
              },
          },
          {
              $project: {
                  _id: 0,
                  event: '$_id.event',
                  count: 1,
              },
          },
      ]);

      res.json(result);
  } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Define a route to get the count of events from the last 5 minutes
router.get('/countLatestEvents', async (req, res) => {
  try {
    // Calculate the date 5 minutes ago from the current time
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

    // Aggregate to get the count of events grouped by type within the last 5 minutes
    const eventCounts = await Events.aggregate([
      {
        $match: {
          date: { $gte: fiveMinutesAgo.toISOString() },
        },
      },
      {
        $group: {
          _id: '$event',
          count: { $sum: 1 },
        },
      },
    ]);

    // Format the result to match the desired structure
    const formattedResult = eventCounts.map((item) => ({
      count: item.count,
      event: item._id || null,
    }));

    res.json(formattedResult);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Define a route to get events within a specified date and time range
router.get('/eventsInRange', async (req, res) => {
  try {
    const { startDate, startTime, endDate, endTime } = req.query;
    let eventsInRange;
    if (startDate === endDate) {
      console.log("iside if part.....................................");
      eventsInRange = await Events.find({
        date: startDate,
        time: { $gte: startTime, $lte: endTime },
      });
    } else {
      console.log("iside else part.....................................");
      eventsInRange = await Events.find({
        date: {
          $gte: startDate,
          $lte: endDate,
        },
        $or: [
          {
            date: startDate,
            time: { $gte: startTime },
          },
          {
            date: endDate,
            time: { $lte: endTime },
          },
          // {
          //   date: { $gt: startDate, $lt: endDate },
          // },
        ],
      });     
}
    res.json(eventsInRange);
    console.log("eventsInRange:" ,eventsInRange);
   } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/eventsInRangeNew', async (req, res) => {
  try {
    const { startTimestamp, endTimestamp } = req.query;

    // Remove leading/trailing whitespaces and newline characters
    const cleanStartTimestamp = startTimestamp.trim();
    const cleanEndTimestamp = endTimestamp.trim();

    let eventsInRange;

    eventsInRange = await Events.find({
      timestamp: {
        $gte: new Date(cleanStartTimestamp),
        $lte: new Date(cleanEndTimestamp),
      },
    });

    res.json(eventsInRange);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


//current date event count---------------------------//
router.get("/event-count", async (req, res) => {
  const currentDate = new Date().toISOString().split("T")[0];

  try {
    const eventCount = await Events.aggregate([
      {
        $match: {
          date: currentDate,
        },
      },
      {
        $group: {
          _id: null,
          count: { $sum: 1 },
        },
      },
    ]);

    const count = eventCount.length > 0 ? eventCount[0].count : 0;
    res.json({ totalEvents: count, date: currentDate });
  } catch (error) {
    console.error("Error fetching event count:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

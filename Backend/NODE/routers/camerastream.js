const express = require('express')
const router = new express.Router()
const http = require('http');
const axios = require('axios');
// const cv = require('opencv4nodejs');
// const ffmpeg = require('fluent-ffmpeg');
const request = require('request');
const { spawn } = require('child_process');
const RtspServer = require('node-rtsp-stream');
// const app = express();
const onvif = require('node-onvif');
const ffmpeg = require('fluent-ffmpeg');
const Stream = require('node-rtsp-stream');
const ffmpegPath = 'C:/ffmpeg/bin/ffmpeg.exe'; 


// Set up the RTSP stream
const rtspStream1 = new Stream({
  name: 'Camera1',
  streamUrl: 'rtsp://admin:TrafikSol@123@172.18.11.73:80/cam/realmonitor?channel=1&subtype=0&unicast=true&proto=Onvif',
//  streamUrl: 'rtsp://192.168.1.103:8080/h264_ulaw.sdp',
  wsPort: 8081,
  ffmpegOptions: {
    '-stats': '',
    '-r': 30
  },
  ffmpegPath: ffmpegPath, 
});

// Set up the first RTSP stream (Camera2) 
const rtspStream2 = new Stream({
  name: 'Camera2',
  streamUrl: 'rtsp://admin:TrafikSol@123@172.18.11.76:80/cam/realmonitor?channel=1&subtype=0&unicast=true&proto=Onvif',
  wsPort: 8082,
  ffmpegOptions: {
    '-stats': '',
    '-r': 30
  },
  ffmpegPath: ffmpegPath,
});

// Set up the second RTSP stream (Camera3)
const rtspStream3 = new Stream({
  name: 'Camera3',
  streamUrl: 'rtsp://admin:TrafikSol@123@172.18.11.77/cam/realmonitor?channel=1&subtype=0&unicast=true&proto=Onvif',
  wsPort: 8083, // Use a different WebSocket port for Camera2
  ffmpegOptions: {
    '-stats': '',
    '-r': 30
  },
  ffmpegPath: ffmpegPath,
});

// Set up the second RTSP stream (Camera4)
const rtspStream4 = new Stream({
  name: 'Camera4',
  streamUrl: 'rtsp://admin:TrafikSol@123@172.18.11.141/cam/realmonitor?channel=1&subtype=0&unicast=true&proto=Onvif',
  wsPort: 8084, // Use a different WebSocket port for Camera2
  ffmpegOptions: {
    '-stats': '',
    '-r': 30
  },
  ffmpegPath: ffmpegPath,
});

// Set up the second RTSP stream (Camera5)
const rtspStream5 = new Stream({
  name: 'Camera5',
  streamUrl: 'rtsp://admin:TrafikSol@123@172.18.11.139/cam/realmonitor?channel=1&subtype=0&unicast=true&proto=Onvif',
  wsPort: 8085, // Use a different WebSocket port for Camera2
  ffmpegOptions: {
    '-stats': '',
    '-r': 30
  },
  ffmpegPath: ffmpegPath,
});

// Set up the second RTSP stream (Camera6)
const rtspStream6 = new Stream({
  name: 'Camera6',
  streamUrl: 'rtsp://admin:TrafikSol@123@172.18.11.144/cam/realmonitor?channel=1&subtype=0&unicast=true&proto=Onvif',
  wsPort: 8086, // Use a different WebSocket port for Camera2
  ffmpegOptions: {
    '-stats': '',
    '-r': 30
  },
  ffmpegPath: ffmpegPath,
});

// Set up the second RTSP stream (Camera7)
const rtspStream7 = new Stream({
  name: 'Camera7',
  streamUrl: 'rtsp://admin:TrafikSol@123@172.18.11.145/cam/realmonitor?channel=1&subtype=0&unicast=true&proto=Onvif',
  wsPort: 8087, // Use a different WebSocket port for Camera2
  ffmpegOptions: {
    '-stats': '',
    '-r': 30
  },
  ffmpegPath: ffmpegPath,
});

// Set up the second RTSP stream (Camera8)
const rtspStream8 = new Stream({
  name: 'Camera8',
  streamUrl: 'rtsp://admin:TrafikSol@123@172.18.11.146/cam/realmonitor?channel=1&subtype=0&unicast=true&proto=Onvif',
  wsPort: 8088, // Use a different WebSocket port for Camera2
  ffmpegOptions: {
    '-stats': '',
    '-r': 30
  },
  ffmpegPath: ffmpegPath,
});

// Set up the second RTSP stream (Camera9)
const rtspStream9 = new Stream({
  name: 'Camera9',
  streamUrl: 'rtsp://admin:TrafikSol@123@172.18.11.147/cam/realmonitor?channel=1&subtype=0&unicast=true&proto=Onvif',
  wsPort: 8089, // Use a different WebSocket port for Camera2
  ffmpegOptions: {
    '-stats': '',
    '-r': 30
  },
  ffmpegPath: ffmpegPath,
});

// Set up the second RTSP stream (Camera10)
const rtspStream10 = new Stream({
  name: 'Camera10',
  streamUrl: 'rtsp://admin:TrafikSol@123@172.18.11.152/cam/realmonitor?channel=1&subtype=0&unicast=true&proto=Onvif',
  wsPort: 8090, // Use a different WebSocket port for Camera2
  ffmpegOptions: {
    '-stats': '',
    '-r': 30
  },
  ffmpegPath: ffmpegPath,
});

// Set up the second RTSP stream (Camera11)
const rtspStream11 = new Stream({
  name: 'Camera11',
  streamUrl: 'rtsp://admin:TrafikSol@123@172.18.11.153/cam/realmonitor?channel=1&subtype=0&unicast=true&proto=Onvif',
  wsPort: 8091, // Use a different WebSocket port for Camera2
  ffmpegOptions: {
    '-stats': '',
    '-r': 30
  },
  ffmpegPath: ffmpegPath,
});

// Set up the second RTSP stream (Camera12)
const rtspStream12 = new Stream({
  name: 'Camera12',
  streamUrl: 'rtsp://admin:TrafikSol@123@172.18.11.157/cam/realmonitor?channel=1&subtype=0&unicast=true&proto=Onvif',
  wsPort: 8092, // Use a different WebSocket port for Camera2
  ffmpegOptions: {
    '-stats': '',
    '-r': 30
  },
  ffmpegPath: ffmpegPath,
});

// Set up the second RTSP stream (Camera13)
const rtspStream13 = new Stream({
  name: 'Camera13',
  streamUrl: 'rtsp://admin:TrafikSol@123@172.18.11.158/cam/realmonitor?channel=1&subtype=0&unicast=true&proto=Onvif',
  wsPort: 8093, // Use a different WebSocket port for Camera2
  ffmpegOptions: {
    '-stats': '',
    '-r': 30
  },
  ffmpegPath: ffmpegPath,
});

router.get('/stream', (req, res) => {
  // Handle other API requests here

  const streamUrl1 = 'rtsp://admin:TrafikSol@123@172.18.11.76:80/cam/realmonitor?channel=1&subtype=0&unicast=true&proto=Onvif'
  const streamUrl2 = 'rtsp://admin:TrafikSol@123@172.18.11.73:80/cam/realmonitor?channel=1&subtype=0&unicast=true&proto=Onvif'
  const streamUrl3 = 'rtsp://admin:TrafikSol@123@172.18.11.77/cam/realmonitor?channel=1&subtype=0&unicast=true&proto=Onvif'
  const streamUrl4 = 'rtsp://admin:TrafikSol@123@172.18.11.141/cam/realmonitor?channel=1&subtype=0&unicast=true&proto=Onvif'
  const streamUrl5 = 'rtsp://admin:TrafikSol@123@172.18.11.139/cam/realmonitor?channel=1&subtype=0&unicast=true&proto=Onvif'
  const streamUrl6 = 'rtsp://admin:TrafikSol@123@172.18.11.144/cam/realmonitor?channel=1&subtype=0&unicast=true&proto=Onvif'
  const streamUrl7 = 'rtsp://admin:TrafikSol@123@172.18.11.145/cam/realmonitor?channel=1&subtype=0&unicast=true&proto=Onvif'
  const streamUrl8 = 'rtsp://admin:TrafikSol@123@172.18.11.146/cam/realmonitor?channel=1&subtype=0&unicast=true&proto=Onvif'
  const streamUrl9 = 'rtsp://admin:TrafikSol@123@172.18.11.147/cam/realmonitor?channel=1&subtype=0&unicast=true&proto=Onvif'
  const streamUrl10 = 'rtsp://admin:TrafikSol@123@172.18.11.152/cam/realmonitor?channel=1&subtype=0&unicast=true&proto=Onvif'
  const streamUrl11 = 'rtsp://admin:TrafikSol@123@172.18.11.153/cam/realmonitor?channel=1&subtype=0&unicast=true&proto=Onvif'
  const streamUrl12 = 'rtsp://admin:TrafikSol@123@172.18.11.157/cam/realmonitor?channel=1&subtype=0&unicast=true&proto=Onvif'
  const streamUrl13 = 'rtsp://admin:TrafikSol@123@172.18.11.158/cam/realmonitor?channel=1&subtype=0&unicast=true&proto=Onvif'

  cameraStreams.forEach((cameraStream, index) => {
    streamStatus[`Camera${index + 1}`] = cameraStream.isRunning(); 
  });

  res.json({ message: 'Camera Streaming Status', streamStatus });

  console.log(streamUrl1);
  console.log(streamUrl2);
  console.log(streamUrl3);
  console.log(streamUrl4);
  console.log(streamUrl5);
  console.log(streamUrl6);
  console.log(streamUrl7);
  console.log(streamUrl8);
  console.log(streamUrl9);
  console.log(streamUrl10);
  console.log(streamUrl11);
  console.log(streamUrl12);
  console.log(streamUrl13);
});





//****************************/
// const NodeRtspRtmpServer = require('node-rtsp-rtmp-server');

// const server = new NodeRtspRtmpServer({
//   serverPort: 1935, // RTMP server port
//   httpPort: 8083,   // HTTP server port for video playback
//   rtspPort: 554,    // RTSP server port
//   rtmpPort: 1935    // RTMP server port
// });

// // Event listener for when a new RTSP client connects
// server.on('rtsp', (client) => {
//   console.log('New RTSP client connected:', client);
// });

// // Event listener for when a new RTMP client connects
// server.on('rtmp', (client) => {
//   console.log('New RTMP client connected:', client);
// });

// // Start the server after setting up event listeners
// server.start();



//*************************/







// const CAMERA_STREAM_URL = 'http://172.18.14.85:554/video';

// router.get('/stream', (req, res) => {
//     res.setHeader('Content-Type', 'video/mp4'); 
  
//     request
//       .get(CAMERA_STREAM_URL)
//       .on('error', err => {
//         console.error('Error fetching camera stream:', err);
//         res.status(500).send('Internal Server Error');
//       })
//       .pipe(res);
//   });

  
// const RTSP_URL = 'rtsp://admin:TrafikSol@123@172.18.14.87:554/cam/realmonitor?channel=1&subtype=0&unicast=true&proto=Onvif';

// // Set up an HTTP endpoint to serve the RTSP stream as an HTTP stream
// router.get('/stream2', (req, res) => {
//   res.setHeader('Content-Type', 'video/mp4');

//   const ffmpegCommand = [
//     '-i', RTSP_URL,
//     '-c:v', 'libx264',
//     '-preset', 'ultrafast',
//     '-tune', 'zerolatency',
//     '-f', 'mpegts',
//     '-vf', 'scale=640:480',
//     '-'
//   ];

//   const ffmpegProcess = spawn('ffmpeg', ffmpegCommand);

//   ffmpegProcess.stdout.pipe(res);

//   ffmpegProcess.on('exit', () => {
//     console.log('FFmpeg process exited');
//   });

//   ffmpegProcess.on('error', (err) => {
//     console.error('Error running FFmpeg:', err);
//     res.status(500).send('Internal Server Error');
//   });

//   req.on('close', () => {
//     ffmpegProcess.kill();
//   });
// });

//   const CAMERA_STREAM_URL1 = 'http://172.18.14.86:554/video';

// router.get('/stream1', (req, res) => {
//     res.setHeader('Content-Type', 'video/mp4'); 
  
//     request
//       .get(CAMERA_STREAM_URL1)
//       .on('error', err => {
//         console.error('Error fetching camera stream:', err);
//         res.status(500).send('Internal Server Error');
//       })
//       .pipe(res);
//   });


//   const CAMERA_STREAM_URL2 = 'http://172.18.14.87:554/video';

// router.get('/stream2', (req, res) => {
//   res.setHeader('Content-Type', 'video/mp4'); 

//   request
//     .get(CAMERA_STREAM_URL2)
//     .on('error', err => {
//       console.error('Error fetching camera stream:', err);
//       res.status(500).send('Internal Server Error');
//     })
//     .pipe(res);
// });
  
  //   const CAMERA_STREAM_URL3 = 'http://172.18.14.88:554/video';

  //   router.get('/stream3', (req, res) => {
  //     res.setHeader('Content-Type', 'video/mp4'); 
    
  //     request
  //       .get(CAMERA_STREAM_URL3)
  //     .on('error', err => {
  //       console.error('Error fetching camera stream:', err);
  //       res.status(500).send('Internal Server Error');
  //     })
  //     .pipe(res);
  // });


  // const CAMERA_STREAM_URL4 = 'http://172.18.14.89:554/video';

  // router.get('/stream4', (req, res) => {
  //   res.setHeader('Content-Type', 'video/mp4'); 
  
  //   request
  //     .get(CAMERA_STREAM_URL4)
  //   .on('error', err => {
  //     console.error('Error fetching camera stream:', err);
  //     res.status(500).send('Internal Server Error');
  //   })
  //   .pipe(res);
// });



// const CAMERA_STREAM_URLS = [
//   'http://192.168.2.116:8081/video',
//   'http://192.168.2.130:8082/video'
// ];

// router.get('/stream', (req, res) => {
//   res.setHeader('Content-Type', 'multipart/x-mixed-replace; boundary=frame');

//   CAMERA_STREAM_URLS.forEach((cameraStreamUrl, index) => {
//     request
//       .get(cameraStreamUrl)
//       .on('error', err => {
//         console.error(`Error fetching camera stream ${index}:`, err);
//       })
//       .on('response', response => {
//         if (response.statusCode === 200) {
//           res.write(`--frame\r\nContent-Type: video/mp4\r\n\r\n`);
//           response.pipe(res, { end: false });
//         } else {
//           console.error(`Error fetching camera stream ${index}:`, response.statusCode, response.statusMessage);
//         }
//       });
//   });

//   req.on('close', () => {
//     // Handle the client closing the connection if needed
//     console.log('Client connection closed');
//   });
// });



// // Define camera settings
// const cameraConfig = {
//     hostname: '172.18.14.87', // Replace with your camera's IP address
//     username: 'admin',        // Replace with your camera's username
//     password: 'TrafikSol@123' // Replace with your camera's password
// };

// // Define the RTSP stream URL
// const rtspUrl = `rtsp://${cameraConfig.username}:${cameraConfig.password}@${cameraConfig.hostname}:554/cam/realmonitor?channel=1&subtype=0&unicast=true&proto=Onvif`;

// // Create an RTSP stream using the node-rtsp-stream library
// const stream = new Stream({
//   streamUrl: rtspUrl,
//   wsPort: 1234 // You can choose any RTSP port
// });

// // Create a GET API endpoint to proxy the RTSP stream
// router.get('/camera-stream', (req, res) => {
//     const request = http.request(rtspUrl, (response) => {
//         response.pipe(res);
//     });
//     request.end();
// });

module.exports = router
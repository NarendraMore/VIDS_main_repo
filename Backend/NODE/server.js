const express = require('express');
const http = require('http');
const axios = require('axios');
const session = require('express-session')
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const db = mongoose.connection;
const server = require('http').createServer(app);
const port = process.env.PORT || 3000;
const loginRouter = require('./routers/login')
const eventsRouter = require('./routers/events')
const cameraStatusRouter = require('./routers/cameraStatus');
const camerastreamRouter = require('./routers/camerastream')
const reportRouter = require('./routers/report')
const bookmarkRouter = require('./routers/bookmark')
const eventsstaticRouter = require('./routers/eventsstatic')
// const animaldetectionRouter = require('./routers/animaldetection')
// const firedetectionRouter = require('./routers/firedetection')
// const objectdetectionRouter = require('./routers/objectdetection')
// const vdandcountingRouter = require('./routers/vdandcounting')
// const wsvehicledetectionRouter = require('./routers/wsvehicledetection')
// const cameraTemperingRouter = require('./routers/cameraTempering')
// const congestionRouter = require('./routers/congestion')
// const overspeedRouter = require('./routers/overspeed')
// const illegalParkingRouter = require('./routers/illegalParking')
// const personcrossRouter = require('./routers/personcross')
// const speeddropRouter = require('./routers/speeddrop')
// const tripwireRouter = require('./routers/tripwire')
// const vclassificationRouter = require('./routers/vclassification');
// const fogWarningRouter = require('./routers/fogWarning')

// Connect to your MongoDB database
mongoose.connect('mongodb://0.0.0.0:27017/VIDS-AP', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to database!');
});


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(loginRouter)
app.use(eventsRouter)
app.use(cameraStatusRouter)
app.use(camerastreamRouter)
app.use(reportRouter)
app.use(bookmarkRouter)
app.use(eventsstaticRouter)
// app.use(animaldetectionRouter)
// app.use(firedetectionRouter)
// app.use(objectdetectionRouter)
// app.use(vdandcountingRouter)
// app.use(wsvehicledetectionRouter)
// app.use(cameraTemperingRouter)
// app.use(congestionRouter)
// app.use(overspeedRouter)
// app.use(illegalParkingRouter)
// app.use(personcrossRouter)
// app.use(speeddropRouter)
// app.use(tripwireRouter)
// app.use(vclassificationRouter)
// app.use(fogWarningRouter)

// Session middleware setup
// app.use(session({
//   secret: 'your-secret-key',
//   resave: false,
//   saveUninitialized: true,
// }));


// Start the server
server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

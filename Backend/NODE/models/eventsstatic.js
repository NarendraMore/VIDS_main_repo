const mongoose = require('mongoose')
mongoose.set('strictQuery', true);


const eventsstaticSchema = mongoose.Schema({
    
date:String,
timestamp:Date,
cameratype:String,
tripwire:Number,
WrongSide:Number,
Tripwire:Number ,
personcross:Number,
Illegalparking:Number

})       
    
const EventsStatic = mongoose.model('EventsStatic',eventsstaticSchema)

module.exports= EventsStatic
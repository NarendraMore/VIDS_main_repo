const mongoose = require('mongoose')
mongoose.set('strictQuery', true);


const eventsSchema = mongoose.Schema({
    event:String,
    date:String,
    time:String,
    timestamp:Date,
    serverip:String,
    cameraip:String,
    cameratype:String,
    location:String,
    imagepath:String,
    status:Boolean,
    vehicletype:String,
    objectype:String,
    videopath:String,
        
})
    
const Events = mongoose.model('Events',eventsSchema)

module.exports= Events
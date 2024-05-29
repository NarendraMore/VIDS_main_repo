const { ObjectId } = require('mongodb');
const mongoose = require('mongoose')
mongoose.set('strictQuery', true);


const bookmarkSchema = mongoose.Schema({
    eventId:ObjectId,
    event:String,
    date:String,
    time:String,
    timestamp:Date,
    cameratype:String,
    location:String,
    imagepath:String,
    videopath:String,
    assignBy:String,
    note:String,
    imageUrl:String,
    status: { type: Boolean, default: false }
        
})
        
    
const Bookmark = mongoose.model('Bookmark',bookmarkSchema)

module.exports= Bookmark
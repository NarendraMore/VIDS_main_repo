const mongoose = require('mongoose')
mongoose.set('strictQuery', true);


const cameraStatusSchema = mongoose.Schema({
    ip:String,
    port: String,
    status: String,
    stream:String,
    location:String    
})
        
    
const CameraStatus = mongoose.model('CameraStatus',cameraStatusSchema)

module.exports= CameraStatus
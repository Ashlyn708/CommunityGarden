const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PlotSchema = new Schema({
    svgID: {type: String, required: true},
    name: {type: String, required: true},
    renter: {type: String, required:true},
    crop:{type:String,required:true},
    date: {type:String,required:true},
    used: {type: Boolean, required: true}
});

module.exports = mongoose.model('Plot', PlotSchema);
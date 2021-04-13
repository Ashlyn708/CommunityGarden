const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let gardenPlotSchema = new Schema({
    name: {type: String, required: true},
    renter:{type: String, required:true},
    crop:{type:String,required:true},
    date:{type:String,required:true},
    used: {type: Boolean, required: true}
});

module.exports = mongoose.model('gardenPlot', gardenPlotSchema);
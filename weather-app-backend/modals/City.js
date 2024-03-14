const mongoose = require('mongoose');

const City = mongoose.model('City',{

   name:String,
   userId:String,
   state:String,
   city: String,
   coords: {
    lat:Number,
    lng:Number
  },

});
module.exports = { City }

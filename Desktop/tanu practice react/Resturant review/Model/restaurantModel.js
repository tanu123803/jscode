const mongoose = require("mongoose");


const RestaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,   
    unique: true
  },
  cuisine: {
    type: String,
    required: true,
    enum: ['Mexican', 'Indian', 'Chinese', 'Other', 'Italian']
  },
  address: {
    type: String,
    required: true
  },
  averageRating: {
    type: Number,
    default: 0
  }
});


const RestaurantModel = mongoose.model("Restaurant", RestaurantSchema);

module.exports = RestaurantModel;

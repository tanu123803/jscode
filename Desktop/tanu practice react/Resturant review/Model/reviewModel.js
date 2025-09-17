const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    minlength: 10
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  restaurant: {   
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant", 
    required: true
  }
});

const ReviewModel = mongoose.model("Review", ReviewSchema);
module.exports = ReviewModel;

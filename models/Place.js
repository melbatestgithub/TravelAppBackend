const mongoose = require("mongoose");
const PlaceSchema = new mongoose.Schema(
  {
    countryId: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    review: { type: String },
    title: { type: String, required: true },
    rating: { type: String, required: true },
    location: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: String, required: true },
    booked: { type: Boolean },
    price: { type: String },
    isRecommended: { type: Boolean },
    isPopular: { type: Boolean  },
    popular: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hotel",
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Place", PlaceSchema);

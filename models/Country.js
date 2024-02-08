const mongoose=require("mongoose")
const countrySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    region: { type: String, required: true },
    isRecommended: { type: Boolean, },
    isPopular: { type: Boolean,  },
    popular: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "place",
      },
    ],
  },
  { timestamps: true }
);
module.exports=mongoose.model("Country",countrySchema)
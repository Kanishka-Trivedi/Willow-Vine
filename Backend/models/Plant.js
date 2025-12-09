// import mongoose from "mongoose";

// const plantSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true },
//     image: { type: String, required: true },
//     rating: { type: Number, default: 0 },
//     oldPrice: { type: String },
//     price: { type: String, required: true },
//     discountLabel: { type: String },
//     link: { type: String },
//     category: { type: String, required: true }
//   },
//   { timestamps: true }
// );

// const Plant = mongoose.model("Plant", plantSchema);

// export default Plant;




import mongoose from "mongoose";

const plantSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    rating: { type: Number, default: 0 },
    oldPrice: { type: String },
    price: { type: String, required: true },
    discountLabel: { type: String },
    link: { type: String },
    category: { type: String, required: true },
    description: { type: String } // <-- Added description field
  },
  { timestamps: true }
);

const Plant = mongoose.model("Plant", plantSchema);

export default Plant;

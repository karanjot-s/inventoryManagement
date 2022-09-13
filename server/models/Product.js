const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    detail: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
  },
  {
    timestamps: true,
    collection: "products",
  }
);

module.exports = mongoose.model("Product", productSchema);

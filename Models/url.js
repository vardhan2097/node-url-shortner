const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      require: true,
      unique: true,
    },
    redirectedUrl: {
      type: String,
      required: true,
    },
    visitedHistory: [
      {
        timestamp: {
          type: Number,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

const url = mongoose.model("url", urlSchema);
module.exports = url;

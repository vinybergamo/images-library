const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  name: String,
  size: Number,
  key: String,
  url: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

PostSchema.pre("save", function () {
  if (!this.url) {
    this.url = `${process.env.APP_URL}/files/${this.key}`;
  }
});

module.exports = mongoose.model("Post", PostSchema);
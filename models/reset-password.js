const mongoose = require("mongoose");
import user from '../user.js';
const Schema = mongoose.Schema;
const resetSchema = new Schema({
email: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600,// this is the expiry time in seconds
  },
});
module.exports = mongoose.model("resetpasswordSchema", resetpasswordSchema);
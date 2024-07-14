const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const bcryptSalt = process.env.BCRYPT_SALT;
const userSchema = new Schema(
  {userId: {
    trim: true,
    type: Schema.Types.ObjectId,
    ref: "users",
    required: [true, "User ID is required"]
  },
    name: {
      type: String,
      trim: true,
      required: false,
      // unique: true,
    },
    resetToken:String,
 
    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
  }
  },
 
  {
    timestamps: true,
  },

);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const hash = await bcrypt.hash(this.password, Number(bcryptSalt));
  this.password = hash;
  next();
});
module.exports = mongoose.model("user", userSchema);

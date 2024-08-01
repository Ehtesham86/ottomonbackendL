const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user.js');
const Joi = require('joi');

// Define the validation schema
const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = new User(req.body);
    await user.save();

    res.send(user);
  } catch (error) {
    res.status(500).send("An error occurred");
    console.log(error);
  }
});

/* POST User signup new account. */
router.post("/api/auth/signup", async function (req, res, next) {
  // Check if this user already exists
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send("That user already exists!");
  } else {
    // Insert the new user if they do not exist yet
    user = new User(_.pick(req.body, ['email', 'password']));

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    res.send(user);
  }
});

/* POST User signin account. */
router.post("/api/auth/signin", async (req, res) => {
  // Now find the user by their email address
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("Incorrect email or password.");
  }

  // Then validate the Credentials in MongoDB match
  // those provided in the request
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).send("Incorrect email or password.");
  }

  const token = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET);
  res.send({ access_token: token });
});

module.exports = router;

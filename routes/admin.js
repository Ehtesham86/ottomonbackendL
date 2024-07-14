// // const { Song } = require("../models/song.js");
// var express = require("express");
// var router = express.Router();
// const auth = require("../middleware/auth");
// router.post("/api/create", auth , async function (req, res, next) {
//     // Check if this song already exists
//     let song = await Song.findOne({ url: req.body.url });
//     if (song) {
//       return res.status(400).send("That song already exists!");
//     } else {
//       // Insert the new user if they do not exist yet
//       song = new Song(
//         _.pick(req.body, [
//           "url",
//           "title",
//           "artist",
//           "album",
//           "genre",
//           "duration",
//           "artwork",
//           "category",
//           "genre",
//         ])
//       );
  
//       await song.save();
//       res.send(song);
//     }
//   });
 
// module.exports = router;

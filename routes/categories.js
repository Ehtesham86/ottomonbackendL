var express = require("express");
const _ = require("lodash");
var router = express.Router();
let MongoClient = require("mongodb").MongoClient;
const { Category } = require("../models/category.js");
const { Song } = require("../models/song.js");

/* GET categories listings. */
router.get("/api/all", async (req, res, next) => {
  const categories = await Category.find({});

  try {
    res.send(categories);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

/* GET categories by name. */
router.get("/api", function (req, res, next) {
  MongoClient.connect(process.env.MONGODB_URI, function (err, db) {
    if (err) throw err;
    var dbo = db.db("test");
    dbo.collection("songs").findOne(
      {
        name: req.params.songTitle,
      },
      function (err, result) {
        if (err) throw err;
        res.json(result);
        db.close();
      }
    );
  });
});

/* GET all songs by category. */
router.get("/api/cat", async (req, res, next) => {
  let song = [],
    data = [],
    categoryName;
  const categories = await Category.find({});

  // for (let i = 0; i < catID.length; i++) {
  //   for (let j = 0; j < songs.length; j++) {
  //     if (catID[i] == songs[j].category) {
  //       song.push(songs[j]);
  //       category = catID[i];
  //     }
  //   }
  //   data.push({ category, song });
  // }

  for (let i = 0; i < categories.length; i++) {
    song = await Song.find({ category: categories[i].id }).populate("artist");
    data.push({ category: categories[i].name, songs: song });
  }
  try {
    res.send(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

/* POST create new categories. */
router.post("/api/create", async function (req, res, next) {
  console.log(req.body.name);

  // Check if this category already exists
  let category = await Category.findOne({ name: req.body.name });
  if (category) {
    return res.status(400).send("That song already exists!");
  } else {
    // Insert the new user if they do not exist yet
    category = new Category(_.pick(req.body, ["name"]));

    await category.save();
    res.send(category);
  }
});

module.exports = router;

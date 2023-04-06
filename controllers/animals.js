const express = require("express");
const router = express.Router();
const startAnimals = require("../db/animalSeed.js");
const Animal = require("../models/animals");

router.use(express.urlencoded({ extended: false }));
// router.set("views", "./views");
// router.set("view engine", "ejs");

// INDEX
router.get("/", async (req, res) => {
  const animals = await Animal.find({});
  res.render("index.ejs", { animals: animals });
});
// NEW ANIMAL
router.get("/new", (req, res) => {
  res.render("new.ejs");
});

// Posts
router.post("/", async (req, res) => {
  console.log(req.body);
  req.body.extinct = req.body.extinct === "on" ? true : false;
  const newAnimal = await Animal.create(req.body);
  res.redirect("/animals");
});

// SHOW
router.get("/show/:id", async (req, res) => {
  const animal = await Animal.findById(req.params.id);
  console.log(animal);
  res.render("show.ejs", { animal });
});

// // EDIT
// router.get("edit/:id/", async (req, res) => {
//   const animal = await Animal.findById(req.params.id);
//   const index = animals.indexOf(animal);
//   res.render("edit.ejs", { animal: animal, index: index });
// });

// // SEED
// router.get("/seed", async (req, res) => {
//   await Animal.deleteMany({});
//   await Animal.create(startAnimals);
//   res.redirect("/animals");
// });

// // UPDATE
// router.put("/update/:id", async (req, res) => {
//   const animal = await Animal.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//   });
//   res.redirect("/animals");
// });

// // DELETE

// router.get("/delete/:id", async (req, res) => {
//   const animalToDelete = await Animal.findById(req.params.id);
//   res.render("/animals/delete.ejs", { animalToDelete });
// });
// router.delete("/delete/:id", async (req, res) => {
//   const animal = await Animal.findByIdAndDelete(req.params.id);
//   res.send({ success: true, animal: animal });
//   // res.redirect("/animals")
// });

module.exports = router;
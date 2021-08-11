const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");

// Welcome Page
router.get("/", (req, res) => res.render("welcome"));

// Dashboard Page
router.get("/dashboard", ensureAuthenticated, (req, res) => {
  if (!req.isAuthenticated()) {
    res.redirect("/users/login");
  }
  const id = req.user.id;
  User.findByIdAndUpdate({ _id: id })
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({
            message: `Cannot Update user with ${id}. Maybe user not found!`,
          });
      } else {
        // console.log(data);
        res.render("dashboard", { user: data });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error Update user information" });
    });
});

// router.post("/dashboard/:id", ensureAuthenticated, (req, res, next) => {
//   if (!req.isAuthenticated()) {
//     res.redirect("/users/login");
//   }

//   console.log(User);
//   console.log(req.body);
//   const { linkedin, github, twitter, facebook } = req.body;
//   console.log(req.params.id);
//   const id = req.params.id;
//   // console.log(linkedin, github, twitter, facebook);
//   // User.findOne({ _id: id })
//   //   .then((doc) => {
//   //     console.log(doc);
//   //   })
//   //   .catch((err) => {
//   //     console.log(err);
//   //   });

//   // User.updateOne(
//   //   { _id: id },
//   //   {
//   //     $set: {
//   //       linkedin: linkedin,
//   //       github: github,
//   //       twitter: twitter,
//   //       facebook: facebook,
//   //     },
//   //   },
//   //   (err) => {
//   //     if (err) {
//   //       throw err;
//   //     }
//   //     User.findOne({ _id: id }, function(err, user) {
//   //       userData = user.data;
//   //       console.log(userData);
//   //     });
//   //     // console.log(userData);
//   //     res.redirect(`public-profile/${id}`);
//   //   }
//   // );

//   User.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
//   .then(data => {
//       if(!data){
//           res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
//       }else{
//           // console.log(data);
//           res.render(`public-profile/${id}`, {user: data});
//       }
//   })
//   .catch(err =>{
//       res.status(500).send({ message : "Error Update user information"})
//   })
// });

// DOne with User Data Updation
// --------------------------------------------------
router.post("/dashboard/:id", ensureAuthenticated, (req, res, next) => {
  if(!req.isAuthenticated()){
    res.redirect("/users/login");
  }
  const id = req.params.id;
  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
  .then((data) => {
    if (!data) {
      res
        .status(404)
        .send({
          message: `Cannot Update user with ${id}. Maybe user not found!`,
        });
    } else {
      console.log(data);
      res.send(`<h1>Thanks for updating data</h1><p><a href="/dashboard">Go Back to Dashboard</a>`);
    }
  })
  .catch((err) => {
    res.status(500).send({ message: "Error Update user information", err});
  });
})

// Get public profile for any user
// --------------------------------------------------
router.get(
  "/dashboard/public-profile/:id",
  ensureAuthenticated,
  (req, res, next) => {
    if (!req.isAuthenticated()) {
      res.redirect("/users/login");
    }
    const id = req.params.id;

    User.findById({ _id: id })
      .then((data) => {
        if (!data) {
          res
            .status(404)
            .send({
              message: `Cannot Update user with ${id}. Maybe user not found!`,
            });
        } else {
          // console.log(data);
          res.render("public-profile", { user: data });
        }
      })
      .catch((err) => {
        res.status(500).send({ message: "Error Update user information" });
      });
  }
);
module.exports = router;

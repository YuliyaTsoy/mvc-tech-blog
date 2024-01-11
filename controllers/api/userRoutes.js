const express = require("express");
const router = express.Router();
const {User, Blog, Comment} = require("../../models/");
const bcrypt  = require("bcrypt");

// GET route for all users and related comments/blogs
router.get("/", (req, res) => {
    User.findAll({
      include:[Blog, Comment]
    })
      .then(dbUsers => {
        res.json(dbUsers);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ msg: "oops.. there is an error", err });
      });
  });

  // GET route: logout by hitting /api/users/logout. Deletes session
router.get("/logout",(req,res)=>{
    req.session.destroy();
    res.redirect('/');
})

// GET route: get one user by id with related comments and blog post
router.get("/:id", (req, res) => {
    User.findByPk(req.params.id,{include:[Blog, Comment]})
      .then(dbUser => {
        res.json(dbUser);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ msg: "oops.. there is an error", err });
      });
});

// POST route: sign up api/users/
router.post("/", (req, res) => {
  // run hooks to hash password; create user
    User.create(req.body, {individualHooks: true} )
      .then(newUser => {
        // creates new session for user with id and username (sessions set to 24hrs)
        req.session.user = {
          id:newUser.id,
          username:newUser.username
        }
        res.json(newUser);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ msg: "oops.. there is an error", err });
      });
});

// POST route: user login api/users/login
router.post("/login", (req, res) => {
  // find username name that matches request
    User.findOne({
      where:{
      username:req.body.username
    }
}).then(foundUser=>{
  // if username is not found, send message
      if(!foundUser){
        return res.status(400).json({msg:"incorrect user name or password"})
      }
      // compare password with saved hash
      if(bcrypt.compareSync(req.body.password,foundUser.password)){
        // if pw matches, create session for user 
        req.session.user = {
          id:foundUser.id,
          username:foundUser.username
        }
        return res.json(foundUser)
        // redirect page??
      } else {
        return res.status(400).json({msg:"incorrect user name or password"})
      }
    }).catch(err => {
        console.log(err);
        res.status(500).json({ msg: "oops.. there is an error", err });
      });
});
  // PUT route: update a user by id
router.put("/:id", (req, res) => {
    User.update(req.body, {
      where: {
        id: req.params.id
      },
      individualHooks: true
    }).then(updatedUser => {
      res.json(updatedUser);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "oops.. there is an error", err });
    });
});
 // delete a user  
router.delete("/:id", (req, res) => {
    User.destroy({
      where: {
        id: req.params.id
      }
    }).then(delUser => {
      res.json(delUser);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "oops.. there is an error", err });
    });
  });

module.exports = router;
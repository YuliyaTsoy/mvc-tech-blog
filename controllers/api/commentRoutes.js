const express = require("express");
const router = express.Router();
const {User, Blog, Comment} = require("../../models");

// GET route for all comments and related users/blogs
router.get("/", (req, res) => {
    Comment.findAll({include:[User, Blog]})
      .then(dbComments => {
        res.json(dbComments);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ msg: "oops.. there is an error", err });
      });
  });

  // GET route: get one comment with related user and blog
router.get("/:id", (req, res) => {
    Comment.findByPk(req.params.id,{include:[User, Blog]})
      .then(dbComment => {
        res.json(dbComment);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ msg: "oops.. there is an error", err });
      });
});

// POST route: create new comment
router.post("/", (req, res) => {
     // verify if the user is logged in - if not, send message
    if(!req.session.user){
      return res.status(401).json({msg:"Please login first!"})
  }
  // Create comment 
    Comment.create({
      body:req.body.body,
      userId:req.session.user.id,
      blogId:req.body.blogId
    })
      .then(newComment => {
        res.json(newComment);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ msg: "an error occured", err });
      });
});

// PUT route: updates a comment by id
router.put("/:id", (req, res) => {
    //checks if user is logged in, if not send message
    if(!req.session.user){
        return res.status(401).json({msg:"Please login first!"})
    }
      // verify user updating is original author
    Comment.update(req.body, {
      where: {
        id: req.params.id
      }
    }).then(updatedComment => {
      res.json(updatedComment);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});

router.delete("/:id", (req, res) => {
    if(!req.session.user){
        return res.status(401).json({msg:"Please login first!"})
    }
      // Verify user deleting is original author
    Comment.destroy({
      where: {
        id: req.params.id
      }
    }).then(delComment => {
      res.json(delComment);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});
  
module.exports = router;
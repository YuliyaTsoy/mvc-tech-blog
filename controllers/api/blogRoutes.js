const express = require("express");
const router = express.Router();
const {User, Blog, Comment} = require("../../models");
const withAuth = require('../../util/auth.js')

// GET route for all blogs and related users/comments
router.get("/", (req, res) => {
    Blog.findAll({include:[User, Comment]})
      .then(dbBlogs => {
        res.json(dbBlogs);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ msg: "oops.. there is an error", err });
      });
  });

  // GET route: get one blog with related user and comment
router.get("/:id", (req, res) => {
    Blog.findByPk(req.params.id,{include:[User, Comment]})
      .then(dbBlog => {
        res.json(dbBlog);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ msg: "oops.. there is an error", err });
      });
});

// POST route: create new blog post
router.post("/", (req, res) => {
  // verify if the user is logged in - if not, send message
    if(!req.session.user){
      return res.status(401).json({msg:"Please login!"})
    }
    // Create blog post with title and content input by user; 

    Blog.create({
      title:req.body.title,
      content:req.body.content,
      userId:req.session.user.id
    })
   
      .then(newBlog => {
        res.json(newBlog);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ msg: "an error occured", err });
      });
});

// update post - withAuth fx 
router.put("/:id", (req, res) => {
  if(!req.session.user){
    return res.status(401).json({msg:"Please login!"})
  }
  Blog.update(req.body, {
      where: {
        id: req.params.id
      }
    }).then(updatedBlog => {
      res.json(updatedBlog);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "oops.. there is an error", err });
    });
});

router.delete("/:id", (req, res) => {
  if(!req.session.user){
    return res.status(401).json({msg:"Please login!"})
  }
    Blog.destroy({
      where: {
        id: req.params.id
      }
    }).then(delBlog => {
      res.json(delBlog);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "oops.. there is an error", err });
    });
});
  
module.exports = router;
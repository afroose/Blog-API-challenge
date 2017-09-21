const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogPosts} = require('./models');

BlogPosts.create(
  '20,000 leagues under the sea', 'a story under water', 'Jules Verne'
);

router.get('/', jsonParser, (req,res) => {
  res.json(BlogPosts.get())
})

router.post('/', jsonParser, (req,res) => {
  const requiredFields = ['title', 'content', 'author'];
  for (let i=0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing field: ${field} in request`;
      console.error(message);
      return res.status(400).send(message);
    }
  }
  const blog = BlogPosts.create(req.body.title, req.body.content, req.body.author);
  res.status(201).json(blog);
})

module.exports = router;

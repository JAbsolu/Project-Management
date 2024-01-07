const express = require("express");
const { createPost, getPost , updatePost  } = require('../controllers/posts');

const router = express.Router();

router.post('/:id', createPost);
router.get('/', getPost);
router.put('/', updatePost);

module.exports = router;

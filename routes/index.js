const express = require('express');
const router = express.Router();
// Controller
const allArticleCtrl = require('./../controllers/allArticle');

// Home
router.get('/', allArticleCtrl.allArticle);

module.exports = router;
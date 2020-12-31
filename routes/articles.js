const express = require('express');
const router = express.Router();
// Controllers
const articleCtrl = require('./../controllers/articlesCtrl');
// 
const saveArticleAndRedirect = require('../controllers/saveArticleAndRedirect');

// New articles
router.get('/new', articleCtrl.article);

// Edit Article
router.get('/edit/:id', articleCtrl.edit);
// Save edit changes
router.put('/:id', articleCtrl.editArticle, saveArticleAndRedirect('edit'));

// Get ID
router.get('/:slug', articleCtrl.articleId);

// Save article
router.post('/', articleCtrl.saveArticle, saveArticleAndRedirect('new'));

// Delete
router.delete('/:id', articleCtrl.deleteArticle);

module.exports = router;
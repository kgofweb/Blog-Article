// Schema
const Article = require('./../models/Article');

exports.article = (req, res) => {
   res.render('articles/new', {
      article: new Article
   });
}

// Id (slug)
exports.articleId = async (req, res) => {
   const article = await Article.findOne({ slug: req.params.slug });

   // If article is not found
   if (article == null) {
      res.redirect('/');
   }
   res.render('articles/show', { article: article });
}

// Save new Article
exports.saveArticle = async (req, res, next) => {
   req.article = new Article();
   next();
}

// Edit
exports.edit = async (req, res) => {
   const article = await Article.findById(req.params.id);
   res.render('articles/edit', { article: article });
}

// Save edit changes
exports.editArticle = async (req, res, next) => {
   req.article = await Article.findById(req.params.id);
   next();
}

// Delete article
exports.deleteArticle = async (req, res) => {
   await Article.findByIdAndDelete(req.params.id);
   res.redirect('/');
}
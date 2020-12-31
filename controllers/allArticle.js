const Article = require('../models/Article');

exports.allArticle = async (req, res) => {
   const article = await Article.find().sort({
      createdDate: 'desc'
   });

   res.render('index', { articles: article });
}
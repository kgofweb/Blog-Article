const mongoose = require('mongoose');
const marked = require('marked');
const slugify = require('slugify');
const createDomPurify = require('dompurify');
const { JSDOM } = require('jsdom');

// Create HTML and purify it
const dompurify = createDomPurify(new JSDOM().window);

const articleSchema = new mongoose.Schema({
   title: {
      type: String,
      required: true
   },
   description: {
      type: String
   },
   markdown: {
      type: String,
      required: true
   },
   createdDate: {
      type: Date,
      default: Date.now
   },
   slug: {
      type: String,
      required: true,
      unique: true
   },
   sanitizeHtml: {
      type: String,
      required: true
   }
});

articleSchema.pre('validate', function(next) {
   if(this.title) {
      this.slug = slugify(this.title, {
         lower: true,
         strict: true
      });
   }

   // Marked
   if(this.markdown) {
      this.sanitizeHtml = dompurify.sanitize(marked(this.markdown));
   }

   next();
});

module.exports = mongoose.model('Aticles', articleSchema);
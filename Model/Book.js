
const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({
  b_image:String,
  b_title:String,
  b_author:String,
  b_publisher:String,
  b_publicationDate:String,
  b_availability:String
})

const bookModel = mongoose.model('book', bookSchema)


module.exports = bookModel;


// "b_image":"/images/hs.jpg",
// "b_title":"kite runner",
// "b_author":"jk rowling",
// "b_publisher":"12-12-2020",
// "b_publicationDate":"1-9-2023"


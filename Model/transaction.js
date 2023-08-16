const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema({
  t_email:String,
  t_id: String,
  t_btitle: String,
  t_date: String,
  d_date: String,
  t_returnDate: String,
});

const transactionModel = mongoose.model("transaction", transactionSchema);

module.exports = transactionModel;

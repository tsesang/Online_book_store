
const express = require("express");
const route = express.Router();
const bookModel = require("../Model/Book");
const userModel = require("../Model/user");
const transaction_model = require("../Model/transaction");
const bcrypt = require("bcrypt");

route.get("/", async (req, res) => {
  let allbooks = await bookModel.find({});

  if (req.session.email) {
    const userObj = await userModel.findOne({ Email: req.session.email });
    if (req.session.email == "admin@gmail.com") {
      return res.render("index", {
        add: "+",
        user: "admin",
        userdata: userObj,
        books: allbooks,
      });
    }

    // index page with fname and logout
    return res.render("index", {
      add: "",
      user: "user",
      userdata: userObj,
      books: allbooks,
    });
  } else {
    //index page with sign in and register button
    return res.render("index", {
      add: "",
      user: "",
      userdata: false,
      books: allbooks,
    });
  }
});

route.get("/login", (req, res) => {
  res.render("login", { diyang: "" });
});

route.post("/login", async (req, res) => {
  console.log(req.body);
  //email valiadation
  const accountExist = await userModel.findOne({ Email: req.body.email });
  if (accountExist) {
    //password validation
    const correct = await bcrypt.compare(
      req.body.password,
      accountExist.Password
    );

    if (correct) {
      //  start the session
      req.session.email = req.body.email;
      return res.redirect("/"); //index view
    }
    return res.render("login", { diyang: "Invalid Password !!" });
  } else {
    return res.render("login", { diyang: "Invalid Email !!" });
  }
});

route.get("/addbook", async (req, res) => {
  const userObj = await userModel.findOne({ Email: req.session.email });
  return res.render("addbook", { userdata: userObj });
});

route.post("/addbook", async (req, res) => {
  const image = req.files.image;
  image.mv("./" + "public/images/" + image.name);

  await bookModel.create({
    b_image: "images/" + image.name,
    b_title: req.body.title,
    b_author: req.body.author,
    b_publisher: req.body.publisher,
    b_publicationDate: req.body.publicationDate,
    b_availability: "true",
  });

  const userObj = await userModel.findOne({ Email: req.session.email });

  return res.render("addBook", { userdata: userObj });
});

route.get("/register", (req, res) => {
  res.render("register", { msg: "" });
});

route.post("/register", async (req, res) => {
  console.log(req.body);
  const userexits = await userModel.findOne({
    Email: req.body.email,
  });

  if (userexits) {
    return res.render("register", {
      msg: "User with this email already exists!!",
    });
  }

  if (req.body.password == req.body.cpassword) {
    // finally we can create an entry
    const hashPass = await bcrypt.hash(req.body.password, 10);

    // we are creating an entry
    userModel.create({
      Name: req.body.fullname,
      Email: req.body.email,
      Mobile: req.body.mobile,
      Address: req.body.address,
      City: req.body.city,
      State: req.body.state,
      Zip: req.body.zip,
      Password: hashPass,
    });
    return res.render("register", { msg: "Account Successfully Created!!!" });
  } else {
    return res.render("register", { msg: "Both passwords do not Match!!!" });
  }
});

route.get("/logout", (req, res) => {
  res.redirect("/login");
});

route.get("/transaction/:id", async (req, res) => {
  if (req.session.email) {
    const book_id = req.params.id;
    const bookObj = await bookModel.findOne({ _id: book_id });
    await bookModel.updateOne(
      { _id: book_id },
      { $set: { b_availability: "false" } }
    );

    const currentDate = new Date();

    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Adding 1 because months are zero-based
    const year = currentDate.getFullYear();

    // Create the formatted date string
    const t_date = `${year}-${month}-${day}`;
    const d_date = `${year}-${month}-${Number(day) + 7}`;

    transaction_model.create({
      t_id: book_id,
      t_email: req.session.email,
      t_btitle: bookObj.b_title,
      t_date: t_date,
      d_date: d_date,
      t_returnDate: "",
    });

    return res.redirect("/");
  } else {
    return res.redirect("/login");
  }
});

route.get("/transaction", async (req, res) => {
  if (req.session.email == "admin@gmail.com") {
    const allTransaction = await transaction_model.find({});
    res.render("transaction", { transactions: allTransaction, show: "" });
  } else {
    const allTransaction = await transaction_model.find({
      t_email: req.session.email,
    });
    res.render("transaction", { transactions: allTransaction, show: "yes" });
  }
});

route.get("/returnBook/:id", async (req, res) => {
  const tid = req.params.id;
  const currentDate = new Date();

  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Adding 1 because months are zero-based
  const year = currentDate.getFullYear();

  const r_date = `${year}-${month}-${day}`;
  console.log(r_date);

  // await transaction_model.updateOne(
  //   { t_id: tid },
  //   { $set: { t_returnDate: r_date } }
  // );


  console.log(tid);

  const result = await transaction_model.updateOne(
    { t_id: tid }, // Using a different field, like t_id
    { $set: { t_returnDate: r_date } }
);



  await bookModel.updateOne({ _id: tid }, { $set: { b_availability: "true" } });
  res.redirect("/transaction");
});

route.post("/deleteBook/:id", async (req, res) => {
  await bookModel.findByIdAndRemove(req.params.id);
  res.redirect("/");
});

module.exports = route;

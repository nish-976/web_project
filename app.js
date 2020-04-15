var secretcode = "#98831897njkfdskjsdnfknfd&%78&*&*YHJKNKKLIOI";
const express = require("express");
const mongoose = require("mongoose");
var path = require("path");
var bodyParser = require("body-parser");
const app = express();
var cookieParser = require("cookie-parser");
app.use(cookieParser());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static(path.join(__dirname, "public")));
var contact_options = null;
var options = null;
var searchbar;
var yr,
  sem,
  temp = 1;

function contact() {
  var nodemailer = require("nodemailer");

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "collegenotesjadavpuruniversity@gmail.com",
      pass: "905197LKKS",
    },
  });

  var mailOptions = {
    from: "collegenotesjadavpuruniversity@gmail.com",
    to: "kakolipal528@gmail.com",
    subject: contact_options.email,
    html: "<h5>Name:</h5>" +
      contact_options.name +
      "<h5>Message:</h5>" +
      contact_options.message,
  };

  var mailOptions1 = {
    from: "collegenotesjadavpuruniversity@gmail.com",
    to: "singhrajnishant976@gmail.com",
    subject: contact_options.email,
    html: "<h5>Name:</h5>" +
      contact_options.name +
      "<h5>Message:</h5>" +
      contact_options.message,
  };

  transporter.sendMail(mailOptions);
  transporter.sendMail(mailOptions1);
}

function ask() {
  var nodemailer = require("nodemailer");

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "collegenotesjadavpuruniversity@gmail.com",
      pass: "905197LKKS",
    },
  });

  var mailOptions = {
    from: "collegenotesjadavpuruniversity@gmail.com",
    to: options.askfrom,
    subject: options.uremail,
    html: options.content,
  };
  transporter.sendMail(mailOptions);
}

function sendMail() {
  var nodemailer = require("nodemailer");

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "collegenotesjadavpuruniversity@gmail.com",
      pass: "905197LKKS",
    },
  });

  var mailOptions = {
    from: "collegenotesjadavpuruniversity@gmail.com",
    to: "kakolipal528@gmail.com",
    subject: "NEW KEY",
    text: secretcode,
  };

  var mailOptions1 = {
    from: "collegenotesjadavpuruniversity@gmail.com",
    to: "singhrajnishant976@gmail.com",
    subject: "NEW KEY",
    text: secretcode,
  };
  transporter.sendMail(mailOptions);
  transporter.sendMail(mailOptions1);
}

function newKey() {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var length = 30;
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

app.get("/", (req, res, next) => {
  res.render("home.ejs");
});
app.get("/signin", (req, res, next) => {
  res.render("signin.ejs", {
    temp: temp,
  });
});
app.get("/signup", (req, res, next) => {
  res.render("signup.ejs");
});

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

app.get("/admin", (req, res, next) => {
  if (!isEmpty(req.cookies))
    res.render("admin.ejs", {
      success: "",
    });
  else res.render("signup.ejs");
});

app.post("/signin", (req, res) => {
  res.redirect("/signin");
});

app.get("/logout", (req, res, next) => {
  res.clearCookie("email");
  res.clearCookie("password");
  temp = 1;
  res.render("signin.ejs", {
    temp: temp,
  });
});

app.get("/home", (req, res, next) => {
  res.render("home.ejs");
});
app.get("/comment", (req, res, next) => {
  res.render("next.ejs");
});

app.get("/about", (req, res, next) => {
  res.render("aboutUs.ejs");
});

app.get("/next", (req, res, next) => {
  res.render("next.ejs");
});

app.get("/slides", (req, res, next) => {
  res.render("slides.ejs", {
    yr: yr,
    sem: sem,
  });
});

app.get("/assignments", (req, res, next) => {
  res.render("assignments.ejs", {
    yr: yr,
    sem: sem,
  });
});

app.get("/books", (req,res,next) => {
    res.render("books.ejs", {
      yr: yr,
      sem: sem,
    });
});

app.get("/questionpapers", (req,res,next) => {
    res.render("questions.ejs", {
      yr: yr,
      sem: sem,
    });
});

app.get("/videos", (req, res, next) => {
  res.render("videos.ejs", {
    yr: yr,
    sem: sem,
  });
});

var Course;
var Login;
var login;
var searcher;
var searcher1;
var Subject;
var Comment;

async function Searcher() {
  const l = await Course.find({
    year: searchbar.year,
    tag: searchbar.tag,
  });

  return l;
}

async function slidefinder() {
  const l = await Slide.find({
    year: findslidebar.year,
    tag: findslidebar.tag,
  });

  return l;
}

async function assignmentfinder() {
  const l = await Assignment.find({
    year: findassignmentbar.year,
    tag: findassignmentbar.tag,
  });

  return l;
}

async function questionfinder() {
  const l = await Question.find({
    year: findquestionbar.year,
    tag: findquestionbar.tag,
  });

  return l;
}

async function bookfinder() {
  const l = await Book.find({
    year: findbookbar.year,
    tag: findbookbar.tag,
  });

  return l;
}

async function SubjectSearcher() {
  const l = await Subject.find({
    year: searcher1.year,
    sem: searcher1.sem,
  });

  return l;
}

async function Commenter() {
  const l = await Comment.find({});

  return l;
}

mongoose
  .connect(
    "mongodb+srv://ramit:905197LKKS@cluster0-zol4l.gcp.mongodb.net/webtech?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => {
    console.log("Connected to MOngoDB");
    performDBOps();
  })
  .catch((err) => console.error("cannot connect"));

async function performDBOps() {
  let DBSchema = await new mongoose.Schema({
    name: String,
    link: String,
    year: String,
    semester: String,
    tag: String,
    date: {
      type: Date,
      default: Date.now
    },
    isPublished: Boolean,
  });
  let SlideSchema = await new mongoose.Schema({
    name: String,
    link: String,
    year: String,
    semester: String,
    tag: String,
    date: {
      type: Date,
      default: Date.now
    },
    isPublished: Boolean,
  });
  let AssignmentSchema = await new mongoose.Schema({
    name: String,
    link: String,
    year: String,
    semester: String,
    tag: String,
    date: {
      type: Date,
      default: Date.now
    },
    isPublished: Boolean,
  });
  let QuestionSchema = await new mongoose.Schema({
    name: String,
    link: String,
    year: String,
    semester: String,
    tag: String,
    date: {
      type: Date,
      default: Date.now
    },
    isPublished: Boolean,
  });
  let BookSchema = await new mongoose.Schema({
    name: String,
    year: String,
    semester: String,
    tag: String,
    date: {
      type: Date,
      default: Date.now
    },
    isPublished: Boolean,
  });
  let SubjectSchema = await new mongoose.Schema({
    year: String,
    sem: String,
    subjects: Array,
  });
  let LoginSchema = await new mongoose.Schema({
    email: String,
    password: String,
  });
  let CommentSchema = await new mongoose.Schema({
    name: String,
    comment: String,
  });

  Subject = mongoose.model("Value", SubjectSchema);
  Course = mongoose.model("Course", DBSchema);
  Slide = mongoose.model("Slide", SlideSchema);
  Assignment = mongoose.model("Assignment", AssignmentSchema);
  Question = mongoose.model("Question",QuestionSchema);
  Book = mongoose.model("Book", BookSchema);
  Login = mongoose.model("Login", LoginSchema);
  Comment = mongoose.model("Comment", CommentSchema);
}

app.post("/register", (req, res) => {
  if (req.body.code != secretcode);
  else {
    const login = new Login({
      email: req.body.email,
      password: req.body.password,
    });
    login.save();

    secretcode = newKey();
    sendMail();
    res.cookie("email", req.body.email);
    res.cookie("password", req.body.password);
    res.render("admin.ejs", {
      success: "",
    });
  }
});

app.post("/commentArr", (req, res) => {
  Commenter().then((alert) => res.send(alert));
});

app.post("/commentsec", (req, res) => {
  const com = new Comment({
    name: req.body.fname,
    comment: req.body.cmnt,
  });
  com.save();
  res.redirect("/comment");
});

app.post("/video", (req, res) => {
  const lectures = new Course({
    name: req.body.video,
    link: req.body.link,
    year: req.body.yr,
    semester: req.body.sems,
    tag: req.body.subj,
    isPublished: true,
  });
  lectures.save((err, lecture) => {
    if (err) return console.log(err);
    res.render("admin.ejs", {
      success: "Record inserted successfully",
    });
  });
});

app.post("/login", (req, res) => {
  var email = req.body.email;
  var password = req.body.password;

  Login.findOne({
    email: email,
    password: password
  }, function(err, result) {
    if (err) {
      console.log(err);
      return res.status(500).send();
    }
    if (!result) {
      res.render('signin.ejs', {
        temp: 0,
      });
      //temp = 0;
      //res.redirect("/signin");
    } else {
      res.cookie("email", email);
      res.cookie("password", password);
      res.render("admin.ejs", {
        success: "",
      });
    }
  });
});

app.post("/contact", (req, res) => {
  contact_options = {
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
  };
  contact();
  res.render("home.ejs");
});

app.post("/ask", (req, res) => {
  options = {
    uremail: req.body.from,
    askfrom: req.body.to,
    content: req.body.query,
  };
  ask();
  res.render("next.ejs");
});

app.post("/search", (req, res) => {
  searchbar = new Course({
    year: req.query.year,
    tag: req.query.tag,
  });
  Searcher().then((alert) => res.send(alert));
});

app.post("/findslide", (req, res) => {
  findslidebar = new Slide({
    year: req.query.year,
    tag: req.query.tag,
  });
  slidefinder().then((alert) => res.send(alert));
});

app.post("/findassignment", (req, res) => {
  findassignmentbar = new Assignment({
    year: req.query.year,
    tag: req.query.tag,
  });
  assignmentfinder().then((alert) => res.send(alert));
});

app.post("/findquestion", (req,res) => {
  findquestionbar = new Question({
     year: req.query.year,
     tag:req.query.tag,
  });
  questionfinder().then((alert) => res.send(alert));
});

app.post("/findbook", (req,res) => {
  findbookbar = new Book({
     year: req.query.year,
     tag:req.query.tag,
  });
  bookfinder().then((alert) => res.send(alert));
});

app.post("/yeardata", (req, res) => {
  searcher1 = new Subject({
    year: req.query.year,
    sem: req.query.sem,
  });
  SubjectSearcher().then((alert) => res.send(alert));
});
app.post("/next", (req, res) => {
  yr = req.body.yr;
  sem = req.body.sem;
  res.redirect("/next");
});
const port = process.env.PORT || 3000;
app.listen(port);

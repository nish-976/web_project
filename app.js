const secretcode = "#98831897njkfdskjsdnfknfd&%78&*&*YHJKNKKLIOI";

const express = require("express");
const mongoose = require("mongoose");
var path = require("path");
var bodyParser = require("body-parser");

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
var searchbar;
var yr,
    sem,
    temp = 1;
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

app.get("/admin", (req, res, next) => {
    res.render("signup.ejs");
});

app.get("/logout", (req, res, next) => {
    res.render("signin.ejs", {
        temp: temp,
    });
});

app.get("/adminpage", (req, res, next) => {
    res.render("admin.ejs", {
        success: "",
    });
});

app.get("/home", (req, res, next) => {
    res.render("home.ejs");
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

async function Searcher() {
    const l = await Course.find({
        year: searchbar.year,
        tag: searchbar.tag,
    });

    return l;
}

async function finder() {
    const l = await Slide.find({
        year: findbar.year,
        tag: findbar.tag,
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

mongoose
    .connect(
        "mongodb+srv://ramit:905197LKKS@cluster0-zol4l.gcp.mongodb.net/webtech?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }
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
        date: { type: Date, default: Date.now },
        isPublished: Boolean,
    });
    let SlideSchema = await new mongoose.Schema({
        name: String,
        link: String,
        year: String,
        semester: String,
        tag: String,
        date: { type: Date, default: Date.now },
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

    Subject = mongoose.model("Value", SubjectSchema);
    Course = mongoose.model("Course", DBSchema);
    Slide = mongoose.model("Slide", SlideSchema);
    Login = mongoose.model("Login", LoginSchema);
}

app.post("/register", (req, res) => {
    if(req.body.code != secretcode)
    ;
    else
    {
    const login = new Login({
        email: req.body.email,
        password: req.body.password,
    });
    login.save();

    res.redirect("/adminpage");
}
});

app.post("/signin", (req, res) => {
    res.redirect("/signin");
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

    Login.findOne({ email: email, password: password }, function(err, result) {
        if (err) {
            console.log(err);
            return res.status(500).send();
        }
        if (!result) {
            temp = 0;
            res.redirect("/signin");
        } else {
            res.redirect("/adminpage");
        }
    });
});

app.post("/search", (req, res) => {
    searchbar = new Course({
        year: req.query.year,
        tag: req.query.tag,
    });
    Searcher().then((alert) => res.send(alert));
});

app.post("/find", (req, res) => {
    findbar = new Slide({
        year: req.query.year,
        tag: req.query.tag,
    });
    finder().then((alert) => res.send(alert));
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

const port = 3000;

app.listen(port);
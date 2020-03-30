const express = require("express");
const mongoose = require("mongoose");
var path = require("path");
var bodyParser = require("body-parser");

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res, next) => {
    res.render("signup.ejs");
});
app.get("/signin", (req, res, next) => {
    res.render("signin.ejs");
});
app.get("/signup", (req, res, next) => {
    res.render("signup.ejs");
});

app.get("/home", (req, res, next) => {
    res.render("home.ejs");
});

app.get("/next", (req, res, next) => {
    res.render("next.ejs");
});

app.get("/slides", (req, res, next) => {
    res.render("slides.ejs");
});

var Course;
var Login;
var login;
var searcher;
var searcher1;
var Subject;
async function Logger() {
    const l = await Login.find({
        username: login.username,
        password: login.password
    });
    if (l.length === 1) return "true";
    else return "false";
}

async function Searcher() {
    const l = await Course.find({
        year: searcher.year,
        password: searcher.semester
    });

    return l;
}

async function SubjectSearcher() {
    const l = await Subject.find({
        year: searcher1.year,
        sem: searcher1.sem
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
    .catch(err => console.error("cannot connect"));

async function performDBOps() {
    let DBSchema = await new mongoose.Schema({
        name: String,
        link: String,
        year: String,
        semester: String,
        tag: String,
        date: { type: Date, default: Date.now },
        isPublished: Boolean
    });
    let SubjectSchema = await new mongoose.Schema({
        year: String,
        sem: String,
        subjects: Array
    });
    let LoginSchema = await new mongoose.Schema({
        username: String,
        password: String
    });

    Subject = mongoose.model("Value", SubjectSchema);
    Course = mongoose.model("Course", DBSchema);
    Login = mongoose.model("Login", LoginSchema);
}

app.post("/", (req, res) => {
    const course = new Course({
        name: req.query.name,
        link: req.query.link,
        year: req.query.year,
        semester: req.query.sem,
        tag: req.query.tag,
        isPublished: true
    });
    course.save();

    res.send("Entry Recorded");
});

app.post("/register", (req, res) => {
    const login = new Login({
        username: req.query.username,
        password: req.query.password
    });
    login.save();

    res.send("Registered User");
});

app.post("/login", (req, res) => {
    login = new Login({
        username: req.query.username,
        password: req.query.password
    });
    Logger().then(alert => res.send(alert));
});

app.post("/search", (req, res) => {
    searcher = new Course({
        year: req.query.year,
        semester: req.query.sem
    });
    Searcher().then(alert => res.send(alert));
});

app.post("/yeardata", (req, res) => {
    searcher1 = new Subject({
        year: req.query.year,
        sem: req.query.sem
    });
    SubjectSearcher().then(alert => res.send(alert));
});

app.post("/next", (req, res) => {
    console.log(req.body.dept);
    console.log(req.body.yr);
    console.log(req.body.sem);

    res.redirect("/next");
});

const port = 3000;

app.listen(port);
//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash"); // To give case-insensitiveness, install it npm i lodash

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const posts = [];

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get("/", function(req, res) {
  // To add posts array (generated due to compose.ejs) data into Home.ejs file for the /compose route
  res.render("Home", {
    HomeContent: homeStartingContent,
    postContent: posts
  });
  //res.render("Home",{HomeContent: JSON.stringify(posts)})
  //console.log(posts);
});
// No need to create app.post for Home , About & contact as they are only static webpages, will change content on href="route address"
// get extract values from app.js for their .ejs files key-value pairs
app.get("/about", function(req, res) {
  res.render("about", {
    aboutContent: aboutContent
  });
});
app.get("/contact", function(req, res) {
  res.render("contact", {
    contactContent: contactContent
  });
});

app.get("/compose", function(req, res) {
  res.render("compose");
});

app.post("/compose", function(req, res) {
  const post = {
    title: req.body.title,
    postBody: req.body.postBody
  }
  posts.push(post);
  //const stringPost = JSON.stringify(post);
  //console.log(stringPost);
  res.redirect("/");
});
// express routing parameters
app.get("/posts/:newParameter", function(req, res) {

  const newParameter = _.lowerCase(req.params.newParameter);

  posts.forEach((newPost) => {
    // Convert that post title into lowerCase as well before accessing it through posts array.
    const storedTitle = _.lowerCase(newPost.title);
    if (newParameter === storedTitle) {
      //console.log("Match Found");
      res.render("post", {
        postTitle: newPost.title,
        postContent: newPost.postBody
      });
    }
  });
});
// IMP :- If there is no submit button (type) or form with mehod="post" then we don’t use app.post() method.

app.listen(3000, function() {
  console.log("Server started on port 3000");
});

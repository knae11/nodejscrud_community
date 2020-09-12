var express = require("express");
var router = express.Router();
var template = require("../lib/template.js");
const { Post, User } = require("../models");
const { is_loggedIn, is_NotloggedIn } = require("./middlewares");

router.get("/", function (request, response, next) {
  //console.log(request.user);
  Post.findAll({
    include: { model: User, attributes: ["id", "nick"] },
    order: [["updatedAt", "DESC"]],
  })
    .then((posts) => {
      //console.log(posts);
      response.render("homepage", {
        title: "home_community",
        intro: "WELCOME",
        posts: posts,
        user: request.user,
        loginError: request.flash("loginerror"),
        // user: `${request.session.nick}`,
      });
    })
    .catch((error) => {
      console.error(error);
      next(error);
    });
});

module.exports = router;

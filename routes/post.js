const { compareSync } = require("bcrypt");
const { request, response } = require("express");
var express = require("express");
var router = express.Router();
//var template = require("../lib/template.js");
const { Post } = require("../models");
const user = require("../models/user");
const { is_loggedIn } = require("./middlewares");

router.post("/", is_loggedIn, async function (request, response, next) {
  try {
    const post = await Post.create({
      content: request.body.content,
      title: request.body.title,
      userId: request.user.id,
    });
    response.redirect("/");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/:id/update", is_loggedIn, async (request, response, next) => {
  // console.log(request.params.id);
  const userposts = await Post.findOne({ where: { id: request.params.id } });
  // console.log(userposts);
  response.render("update", {
    title: "update",
    extitle: userposts.title,
    excontent: userposts.content,
    user: request.user,
    postid: userposts.id,
  });
});

router.post(
  "/:id/update_process",
  is_loggedIn,
  async (request, response, next) => {
    const newpost = request.body;
    const userposts = await Post.findOne({
      where: { id: request.params.id },
    });
    const update = await userposts.update({
      titie: newpost.title,
      content: newpost.content,
    });
    response.redirect("/");
  }
);

router.post(`/:id/delete`, is_loggedIn, async function (
  request,
  response,
  next
) {
  try {
    const destroypost = await Post.findOne({
      where: { id: request.params.id },
    });
    const deleted = await destroypost.destroy();
    response.redirect("/");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;

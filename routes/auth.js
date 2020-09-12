var express = require("express");
var router = express.Router();
//var template = require("../lib/template.js");
const passport = require("passport");
const bcrypt = require("bcrypt");
const { is_loggedIn, is_NotloggedIn } = require("./middlewares");
const { User } = require("../models");
// var authData = {
//   email: "egoing777@gmail.com",
//   password: "111111",
//   nickname: "egoing",
// };
router.get("/register", is_NotloggedIn, function (request, response) {
  response.render("register", { title: "register", intro: "REGISTER" });
  // var title = "register";
  // var html = template.HTML(
  //   title,
  //   `
  //   <form action="/auth/register_process" method="post">
  //     <p><input type="text" name="email" placeholder="email"></p>
  //     <p><input type="text" name="nick" placeholder="nickname"></p>
  //     <p><input type="password" name="password" placeholder="password"></p>
  //     <p><input type="password" name="password2" placeholder="password"></p>
  //     <p>
  //       <input type="submit" value="login">
  //     </p>
  //   </form>
  // `
  // );
  // response.send(html);
});
router.post("/register_process", async (req, res, next) => {
  const { email, nick, password, password2 } = req.body;

  if (password !== password2) {
    req.flash("비밀번호미일치");
    return res.redirect("/register");
  } else {
    try {
      const exUser = await User.findOne({ where: { email } });
      if (exUser) {
        req.flash("이미 가입됨");
        return res.redirect("/register");
      }
      const hash = await bcrypt.hash(password, 6);
      await User.create({ email, nick, password: hash });
      return res.redirect("/auth/login");
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }
});

router.get("/login", is_NotloggedIn, function (request, response) {
  response.render("login", { title: "login", intro: "LOGIN" });

  // var title = "login";
  // var html = template.HTML(
  //   title,
  //   `
  //   <form action="/auth/login_process" method="post">
  //     <p><input type="text" name="email" placeholder="email"></p>
  //     <p><input type="password" name="password" placeholder="password"></p>
  //     <p>
  //       <input type="submit" value="login">
  //     </p>
  //   </form>
  // `
  // );
  // response.send(html);
});

router.post("/login_process", function (req, res, next) {
  passport.authenticate("local", (autherror, user, info) => {
    if (autherror) {
      console.error(autherror);
      return next(autherror);
    }
    if (!user) {
      req.flash("loginError", info.message);
      return req.redirect("/");
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.log(loginError);
        return next(loginError);
      }
      return res.redirect("/");
    });
  })(req, res, next);
});

router.get("/logout", is_loggedIn, function (request, response) {
  request.logout();
  request.session.destroy(function (err) {
    response.redirect("/");
  });
});
module.exports = router;

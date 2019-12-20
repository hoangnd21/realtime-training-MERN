const users = require('../models/users');


const redirectLogin = (req, res, next) => {
  var a = req.session.user;
  if (a) {
    res.send(req.session.user);
  }
  else {
    res.send('Invalid login. Please try again!');
  }
}
module.exports.redirectLogin = redirectLogin;


const login = (req, res) => {
  const user = req.body.username;
  const pass = req.body.password;
  //const sess = req.session;
  const loginResult = users.findOne(req.body).exec()
    .then((loginResult) => {
      if (loginResult) {
        req.session.user = loginResult;
        res.send(loginResult);
      }
      else {
        res.send("Invalid login. Please try again!");
      }
    });

}
module.exports.login = login;

const logOut = (req, res, next) => {
  if (req.session && req.session.user) {
    req.session = null;
    res.send("loggedOut");

  }
  else {
    res.send("fail to logout");
  }
}
module.exports.logOut = logOut;
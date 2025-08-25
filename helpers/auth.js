module.exports.CheckAuth = function (req, res, next) {
  const UserId = req.session.UserId;

  if (!UserId) {
    res.redirect("/login");
  }

  next();
};

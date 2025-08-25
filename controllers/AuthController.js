const { where } = require("sequelize");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { use } = require("../routes/AuthRoute");

module.exports = class AuthController {
  static login(req, res) {
    res.render("auth/login");
  }

  static register(req, res) {
    res.render("auth/register");
  }

  static async createAccount(req, res) {
    const { name, email, senha, confirmpass } = req.body;

    if (senha != confirmpass) {
      req.flash("message", "As senhas não coincidem, tente novamente !");
      res.render("auth/register");
      return;
    }

    const CheckIfAccountExist = await User.findOne({ where: { email: email } });

    if (CheckIfAccountExist) {
      req.flash("message", "Esse email já esta sendo utilizado!!");
      res.render("auth/register");
      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashed = bcrypt.hashSync(senha, salt);

    const user = {
      name,
      email,
      senha: hashed,
    };

    try {
      const createdUser = await User.create(user);

      req.session.UserId = createdUser.id;

      req.flash("message", "Cadastro realizado com sucesso!!!");

      req.session.save(() => {
        res.redirect("/");
      });
    } catch (err) {
      console.log(err);
    }
  }

  static logout(req, res) {
    req.session.destroy();
    res.redirect("/login");
  }

  static async authAccount(req, res) {
    const { email, senha } = req.body;

    const user = await User.findOne({ where: { email: email } });

    const pass = bcrypt.compareSync(senha, user.senha);

    if (!user || !pass) {
      req.flash("message", "Email ou senha invalido(a)");
      res.render("auth/login");
      return;
    }

    req.session.UserId = user.id;

    req.flash("message", "Login realizado com sucesso");

    req.session.save(() => {
      res.redirect("/");
    });
  }
};

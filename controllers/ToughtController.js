const User = require("../models/User");
const Tought = require("../models/tought");
const { Op, or } = require("sequelize");

module.exports = class ToughtControler {
  static async showToughts(req, res) {
    let search = "";

    let order = "DESC";

    if (req.query.order === "old") {
      order = "ASC";
    } else {
      order = "DESC";
    }

    if (req.query.search) {
      search = req.query.search;
    }

    const toughtData = await Tought.findAll({
      include: User,
      where: {
        title: { [Op.like]: `%${search}%` },
      },
      order: [["createdAt", order]],
    });

    const toughts = toughtData.map((result) => result.get({ plain: true }));

    let toughtsQty = toughts.length;

    if (toughtsQty === 0) {
      toughtsQty = false;
    }

    res.render("toughts/home", { toughts, search, toughtsQty });
  }

  static async dashboard(req, res) {
    const UserId = req.session.UserId;

    const user = await User.findOne({
      where: { id: UserId },
      include: Tought,
      plain: true,
    });

    if (!user) {
      res.redirect("/login");
    }

    const toughts = user.Toughts.map((result) => result.dataValues);

    let emptyToughts = false;

    if (toughts.length === 0) {
      emptyToughts = true;
    }

    res.render("toughts/dashboard", { toughts, emptyToughts });
  }

  static async createTought(req, res) {
    res.render("toughts/create");
  }

  static async saveToughts(req, res) {
    const tought = {
      title: req.body.title,
      UserId: req.session.UserId,
    };

    try {
      await Tought.create(tought);
      req.flash("message", "Seu pensamento foi criado com sucesso!!!");
      req.session.save(() => {
        res.redirect("/tought/dashboard");
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async removeToughts(req, res) {
    const id = req.body.id;
    const UserId = req.session.UserId;

    try {
      await Tought.destroy({ where: { id: id, UserId: UserId } });
      req.flash("message", "Seu pensamento foi removido com sucesso!!!");
      req.session.save(() => {
        res.redirect("/tought/dashboard");
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async editTought(req, res) {
    const id = req.params.id;

    const toughts = await Tought.findOne({ where: { id: id }, raw: true });

    res.render("toughts/edit", { toughts });
  }

  static async updateTought(req, res) {
    const id = req.body.id;

    const toughts = {
      title: req.body.title,
    };

    try {
      await Tought.update(toughts, { where: { id: id } });
      req.flash("message", "Seu pensamento foi editado com sucesso!!!");
      req.session.save(() => {
        res.redirect("/tought/dashboard");
      });
    } catch (error) {
      console.log(error);
    }
  }
};

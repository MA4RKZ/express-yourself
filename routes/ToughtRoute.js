const express = require("express");
const router = express.Router();
const ToughtControler = require("../controllers/ToughtController");
const CheckAuth = require("../helpers/auth").CheckAuth;

router.get("/add", CheckAuth, ToughtControler.createTought);
router.get("/edit/:id", CheckAuth, ToughtControler.editTought);
router.post("/edit", CheckAuth, ToughtControler.updateTought);
router.post("/add", CheckAuth, ToughtControler.saveToughts);
router.post("/remove", CheckAuth, ToughtControler.removeToughts);
router.get("/dashboard", CheckAuth, ToughtControler.dashboard);
router.get("/", ToughtControler.showToughts);

module.exports = router;

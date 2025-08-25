const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const flash = require("express-flash");

//models
const User = require("./models/User");
const Tought = require("./models/tought");

//routes
const ToughtRoutes = require("./routes/ToughtRoute");
const AuthController = require("./routes/AuthRoute");

const ToughtControler = require("./controllers/ToughtController");

const app = express();

const conn = require("./db/conn");
const chalk = require("chalk");

//template views
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

//req body
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

//sessions
app.use(
  session({
    name: "session",
    secret: "1647",
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
      logFn: function () {},
      path: require("path").join(require("os").tmpdir(), "sessions"),
    }),

    cookie: {
      secure: false,
      maxAge: 36000,
      expires: new Date(Date.now() + 36000),
      httpOnly: true,
    },
  })
);
app.use(flash());

app.use(express.static("public"));

app.use((req, res, next) => {
  if (req.session.UserId) {
    res.locals.session = req.session;
  }
  next();
});

app.use("/tought", ToughtRoutes);
app.use("/", AuthController);
app.get("/", ToughtControler.showToughts);

conn
  .sync()
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => console.log(chalk.blueBright("A porta está funcionando")));

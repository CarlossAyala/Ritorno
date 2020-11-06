const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const pool = require("../database");
const helpers = require("./helpers");

passport.use(
  "local.signin",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      const rows = await pool.query("SELECT * FROM owners WHERE EMAIL = ?", [username]);
      //Verifica si hay un username que introdujo
      if (rows.length > 0) {
        const user = rows[0];
        //Valida la Password
        const validPassword = await helpers.matchPassword(
          password,
          user.PASSWORD
        );
        if (validPassword) {
          done(null, user, req.flash("success", "Bienvenido " + user.NAME));
        } else {
          done(null, false, req.flash("message", "Contraseña incorrecta!"));
        }
      } else {
        return done(null, false, req.flash("message", "Esta cuenta no existe."));
      }
    }
  )
);

passport.use(
  "local.signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      const { name } = req.body;
      let newUser = {
        name,
        surname: null,
        email: username,
        password
      };
      newUser.password = await helpers.encryptPassword(password);
      // Saving in the Database
      const result = await pool.query("INSERT INTO owners SET ? ", newUser);
      newUser.ID = result.insertId;
      return done(null, newUser);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.ID);
});

passport.deserializeUser(async (id, done) => {
  const rows = await pool.query("SELECT * FROM owners WHERE id = ?", [id]);
  done(null, rows[0]);
});

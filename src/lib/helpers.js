const bcrypt = require("bcryptjs");
const pool = require('../database');

const helpers = {};

helpers.hasPlan = async (req, res, next) => {
  const query = await pool.query("SELECT PLAN FROM owners WHERE ID = ?", req.user.ID);
  if (query[0].PLAN != undefined) {
    return next();
  }
  req.flash("message", "Necesitas un Plan para acceder a este contenido.");
  res.redirect('/cuenta/planes');
};


helpers.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

helpers.matchPassword = async (password, savedPassword) => {
  try {
    return await bcrypt.compare(password, savedPassword);
  } catch (e) {
    console.log(e);
  }
};

helpers.checkAddPet = async (id) => {
  const query = await pool.query("SELECT PLAN FROM owners WHERE ID = ?", id);
  const queryDogs = await pool.query("SELECT count(*) AS NUM FROM dogs WHERE ID_OWNER = ?", id);
  let valid = false;

  let limit;
  switch (query[0].PLAN) {
    case "Básico":
      limit = 1;
      break;
    case "Medio":
      limit = 3;
      break;
    case "Alto":
      limit = 10;
      break;
  }
  if( (limit - queryDogs[0].NUM) <= 0 ){
    valid = false;
  }else{
    valid = true;
  }

  return valid;
};

helpers.setDateDog = (state) => {
  let date;
  if (state === "extraviado") {
    date = new Date();
  } else {
    date = null;
  }
  return date;
};

helpers.getPricePlan = (miPlan) => {
  let subplan;
  switch (miPlan.PLAN) {
    case "Básico":
      subplan = {
        mensual: 390,
        anual: 2790,
      };
      break;
    case "Medio":
      subplan = {
        mensual: 690,
        anual: 4990,
      };
      break;
    case "Alto":
      subplan = {
        mensual: 990,
        anual: 6990,
      };
      break;
  }
  return subplan;
};

helpers.getPriceSubplan = (suPlan, subPlans) => {
  //Obtener el precio del Subplan
  let price;
  if (suPlan == "Mensual") {
    price = subPlans.mensual;
  } else {
    price = subPlans.anual;
  }
  return price;
};

module.exports = helpers;

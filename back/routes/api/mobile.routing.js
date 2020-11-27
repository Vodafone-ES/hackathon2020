/* RUTAS PARA GESTIONAR EL CRUD DE LAS URL */

const getMatchesTerminals = require("../../python/tinderphone-launch");
const router = require('express').Router();


router.post('/', (req, res) => {
  let value = req.body.status;
  console.log(value);
  console.log(typeof value);
  value = value.map(val => Number(val));
  console.log('New Value', value);
  getMatchesTerminals(value)
  res.send('200')
})

module.exports = router

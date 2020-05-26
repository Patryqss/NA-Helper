const express = require('express');
const router = express.Router();

//get all chars
router.get('/', async (req, res) => {
  const Char = res.locals.models.char;
  const char = await Char.find().sort('place');
  res.send(char);
});

//get one char
router.get('/:id', async (req, res) => {
  const Char = res.locals.models.char;

  const char = await Char.findById(req.params.id);
  if (!char) res.status(404).send(`Character with id ${req.params.id} not found`);
  res.send(char);
});

//add new char
router.post('/', async (req, res) => {
  const Char = res.locals.models.char;
  let char = new Char(req.body);
  await char.save();
  console.log('[MongoDB] New char added');
  res.send(char);
});

module.exports = router;

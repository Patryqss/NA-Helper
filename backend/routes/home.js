const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.write('Hello!');
  res.end();
});

module.exports = router;

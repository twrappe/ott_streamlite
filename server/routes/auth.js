const express = require('express');
const router = express.Router();

// Example public route
router.get('/', (req, res) => {
  res.send('Auth route is working');
});

module.exports = router;
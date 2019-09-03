const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.send({data:true, message:"Welcome! App is working"})
});
module.exports = router;
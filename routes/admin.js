const express = require('express');
const router = express.Router();

const adminModel = require('../models/adminModel')


router.get('/index', (req, res,next)=>{
  res.render('index');
});


module.exports = router;
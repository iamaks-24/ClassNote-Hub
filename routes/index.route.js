const express = require('express');
const router=require('express').Router()

router.get('/',(req,res,next)=>{
    res.render('index')
})
router.use('/auth', require('./auth.route'));
module.exports=router;
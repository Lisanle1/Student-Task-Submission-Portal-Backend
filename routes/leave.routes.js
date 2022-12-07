const express=require('express');
const router=express.Router();
const leave=require('../controllers/leave.controller') 

router.get('/', leave.getLeaves)
router.post('/', leave.createLeaves)

module.exports=router;
const express=require('express');
const router=express.Router();
const user =require('../controllers/user.controller');

router.get('/',user.getAllUsers);
router.post('/login',user.userSignIn);
router.post('/signup',user.userSignUp);
router.post('/forgot-password',user.userForgotPassword);
router.put('/reset-password/:tokenId',user.userResetPassword);

module.exports=router;
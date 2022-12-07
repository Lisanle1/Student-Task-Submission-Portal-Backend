const express=require('express');
const router=express.Router();
const webcode=require('../controllers/webcode.controller')

// to create
router.get('/', webcode.getAllWebcodes)
router.post('/', webcode.createWebcode)
router.patch('/:id', webcode.updateWebcode)
router.delete('/:id', webcode.deleteWebcode)

// for submisson
router.get('/submissions', webcode.getWebcodeSubmissions)
router.post('/submissions', webcode.createWebcodeSubmissions)

module.exports=router;
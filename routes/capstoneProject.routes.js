const express=require('express');
const router=express.Router();
const capstone=require('../controllers/capstoneProject.controller')

router.get('/', capstone.getAllCapstone)
router.post('/', capstone.createCapstone)
router.patch('/:id', capstone.updateCapstone)
router.delete('/:id', capstone.deleteCapstone)

router.get('/submissions', capstone.getAllCapstoneSubmissions)
router.post('/submissions', capstone.createCapstoneSubmissions)

module.exports=router;
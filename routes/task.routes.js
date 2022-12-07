const express=require('express');
const router = express.Router()
const task=require('../controllers/task.controller');

router.get('/', task.getAllTasks)
router.post('/', task.createTasks)

module.exports=router; 
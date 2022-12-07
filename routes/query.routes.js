const express=require('express');
const router=express.Router();
const query=require('../controllers/query.controller')

router.get('/', query.getAllQueries)
router.post('/', query.createQuery)
router.patch('/:id', query.updateQuery)
router.delete('/:id', query.deleteQuery)

module.exports=router;
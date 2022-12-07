const express=require('express');
const router=express.Router();
const session=require('../controllers/session.controllers');

router.get('/', session.getAllSessions)
router.post('/', session.createSession)
router.patch('/:id', session.updateSession)
router.delete('/:id', session.deleteSession)

module.exports=router;
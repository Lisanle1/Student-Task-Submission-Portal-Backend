const express=require('express');
const router=express.Router();
const addSession=require('../controllers/additionalSession.controller')

router.get('/', addSession.getAllAdditionalSessions)
router.post('/', addSession.createAdditionalSession)
router.patch('/:id', addSession.updateAdditionalSession)
router.delete('/:id', addSession.deleteAdditionalSession)

module.exports=router;
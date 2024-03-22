const express =require('express');
const router =express.Router()
const admin= require('../controllers/admin');
const auth=require('../controllers/auth')
const verify=require('../controllers/verify');
const util=require('../controllers/util')

router.post('/register',auth.adminReg)
router.post('/login',auth.adminLogin)
router.post('/doctor',verify.adminVerify,admin.addDoctor);
router.delete('/doctor',verify.adminVerify,admin.deleteDoctor);
router.get('/doctor',verify.adminVerify,admin.getDoctor);
router.post('/department',verify.adminVerify,admin.addDept)
router.get('/department',verify.adminVerify,util.getDept);
router.delete('/department',verify.adminVerify,admin.deleteDept)

module.exports =router;
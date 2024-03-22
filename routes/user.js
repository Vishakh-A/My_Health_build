const express = require('express')
const router =express.Router()
const user=require('../controllers/user')
const auth =require('../controllers/auth')
const verify=require('../controllers/verify')
const util=require('../controllers/util')

router.post('/login',auth.userLogin)
router.post('/register',auth.userReg)

router.get('/departement',verify.userVerify,util.getDept)
router.get('/doctor',verify.userVerify,user.getDoctor)
router.post('/booking',verify.userVerify,user.addBooking)
router.delete('/cancel',verify.userVerify,user.cancelBooking)


router.get('/all-booking',verify.userVerify,user.getAllBooking)
router.get('/report',verify.userVerify,user.getReport)
router.get('/valid-report',verify.userVerify,user.getvalidReport)

module.exports =router;
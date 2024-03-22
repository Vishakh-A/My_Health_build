const express =require('express');
const router =express.Router();

const doctor =require('../controllers/doctor')
const auth =require('../controllers/auth')
const doctorVerify=require('../controllers/verify')

router.post('/login',auth.doctorLogin);
router.post('/passchange',doctorVerify.doctorVerify,auth.doctorChange)
router.post('/schedule',doctorVerify.doctorVerify,doctor.addSchedule);
router.get('/schedule',doctorVerify.doctorVerify,doctor.getSchedule);
router.delete('/schedule',doctorVerify.doctorVerify,doctor.deleteSchedule);
router.get('/user',doctorVerify.doctorVerify,doctor.getUser);
router.post('/report',doctorVerify.doctorVerify,doctor.addReport);
router.get('/report',doctorVerify.doctorVerify,doctor.getreport);
router.put('/report',doctorVerify.doctorVerify,doctor.addReport)

module.exports =router ;

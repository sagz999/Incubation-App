const express = require('express');
const router = express.Router();
const { fetchAllReq, changeReqStatus, addSlot, allotSlot, fetchSlots, viewApplication } = require('../controller/adminController');

router.get('/fetchAllReq', fetchAllReq)
router.put('/changeReqStatus/', changeReqStatus)
router.post('/addSlot', addSlot)
router.get('/fetchSlots', fetchSlots)
router.patch('/allotSlot', allotSlot)
router.get('/viewApplication/',viewApplication)



module.exports = router;
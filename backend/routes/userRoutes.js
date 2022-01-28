const express = require('express');
const router = express.Router();
const { registerUser, authUser, newApplication, fetchApplication, cancelApplication} = require('../controller/userController')


router.post('/signup',registerUser);
router.post('/login', authUser);
router.post('/apply', newApplication);
router.get('/fetchDatas/', fetchApplication);
router.put('/cancelApplication/', cancelApplication);


module.exports = router;
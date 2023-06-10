const express = require('express');
const router = express.Router();

// controller
const controller = require('../../controller/user/UserController');

/** 회원 가입 */
// router.post('/signUp', controller.signUp);

/* 테스트 */
router.get('/test', controller.controller);

module.exports = router;
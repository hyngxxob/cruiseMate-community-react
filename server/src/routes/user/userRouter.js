const express = require('express');
const router = express.Router();

// controller
const controller = require('../../controller/user/UserController');

/** 회원 가입 */
// router.post('/signUp', controller.signUp);

/* 테스트 */
router.get('/test', controller.controller);

/* 장소 추가 */
router.post('/spot', controller.insertSpot);

/* 장소 가져오기 */
router.get('/spot', controller.selectAllSpot);

module.exports = router;
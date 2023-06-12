/**
 *  사용자 관련 요청 컨트롤러
 *  @module       controller/user/UserController
 *  @author       HYUNGSEOBKIM
 *  @version      1.0
 */

// 공통 라이브러리
const Logger = require('../../lib/logger');
// const JWT = require('../../lib/jwt');
// const Util = require('../../lib/util');
// const client = require('../../lib/rediscloud');
// // jwt에 사용할 토큰 object
const PayloadData = require('../../common/PayloadData');

// // 요청, 응답 데이터
const RequestData = require('../../common/RequestData');
const ResponseData = require('../../common/ResponseData');

// // 상수
const { DB_FIELD_NAME } = require('../../common/Constant');
const { RESPONSE_CODE, RESPONSE_FIELD } = require('../../common/ResponseConst');

// // 모델
const UserModel = require('../../model/user/UserModel');
// const BPModel = require('../../model/bp/BusinessPartnerModel');
// const { json } = require('express');

// // 모듈
// const geoConvertModule = require('../../module/geoConvert');

// const http = require('http');
// const axios = require('axios');

/**
 * 회원 가입
 * @param {Object} req Express Request 객체
 * @param {Object} res Express Response 객체
 * @returns {ResponseData} 응답 데이터
 */
const signUp = async (req, res) => {
// test
  /**  요청 데이터  */
  let requestData = new RequestData(req);

  /**  응답 데이터  */
  let responseData = new ResponseData(requestData);

  try {

    /** 필수 입력 필드 체크 */
    const fieldList = [
      // DB_FIELD_NAME.CREATE_DATE,
      DB_FIELD_NAME.USER_ID,
      DB_FIELD_NAME.PASSWORD,
      DB_FIELD_NAME.USER_NAME,
      DB_FIELD_NAME.USER_EMAIL,
      DB_FIELD_NAME.USER_PHONENUM,
    ];

    if (!requestData.hasAllMandatoryFields(fieldList)) {
      return responseData.setResponseCode(RESPONSE_CODE.REQUIRED_FIELD);
    }

    /**  트랜젝션 여부 셋팅   */
    await requestData.start(true);

    /**  데이터가 있는지 체크    */
    const userInfo = await UserModel.selectUser(requestData, requestData.getBodyValue(DB_FIELD_NAME.USER_ID));

    /**  사용자 정보가 있는 경우  */
    if (userInfo) {
      return responseData.setResponseCode(RESPONSE_CODE.ID_DUPLICATE);
    }

    /** 비밀번호  */
    let password = requestData.getBodyValue(DB_FIELD_NAME.PASSWORD);

    /** 개인 salt 만들기  */
    // const salt       =  await Util.createSalt();

    /** 입력 받은 비밀번호 암호화 */
    // password = await Util.makePasswordHashed(password, salt);
    password = await Util.makeSHA256(password);
    requestData.setBodyValue(DB_FIELD_NAME.PASSWORD, password);
    // requestData.setBodyValue(DB_FIELD_NAME.SALT, salt);

    /**  사용자 생성     */
    const result = UserModel.insertUser(requestData);

    const userInfoAfter = await UserModel.selectUser(requestData, requestData.getBodyValue(DB_FIELD_NAME.USER_ID));
    const assignRole = await UserModel.assignUserRole(requestData, userInfoAfter);

    //BP생성

    const reqParm = {
      HEADER: [
        {
          UUID: userInfoAfter.UUID,
          NAME: userInfoAfter.USERNAME,
          PAR_UUID: '', STATUS: "A", BP_TYPE: "EMPL", DEL_FLAG: ''
        }
      ],
      ADDRESS: [{
        PHONE: userInfoAfter.USER_PHONENUM,
        EMAIL: userInfoAfter.USER_EMAIL,
        UUID: userInfoAfter.UUID,
        MAIN_FLAG: 'X', COUNTRY: '', FAX: '', PHONE: '', STATE: '', CITY: '', ADDR1: '', ADDR2: '', DEL_FLAG: ''
      }]
    }



    const callMergeBP = await BPModel.mergeBP(requestData, reqParm);


    responseData.setResponseCode(RESPONSE_CODE.SUCCESS);
    // if(result){
    //   responseData.setResponseCode(RESPONSE_CODE.SUCCESS);
    // }
    // else {
    //   responseData.setResponseCode(RESPONSE_CODE.DB_ERROR);
    // }
  }
  catch (e) {
    Logger.error(e.stack);
    /** 트랜잭션 롤백  */
    await requestData.error();
    // responseData.setResponseErrCode(RESPONSE_CODE.CONTACT_ADMIN,e.stack);
    responseData.setResponseErrCode(RESPONSE_CODE.CONTACT_ADMIN, e.stack);
  }
  finally {
    /** 트랜잭션 종료 */
    await requestData.end(responseData.isSuccess());
    /** 데이터 응답 */
    res.send(responseData);
  }
};

/**
 * 로그인
 * @param {Object} req Express Request 객체
 * @param {Object} res Express Response 객체
 * @returns {ResponseData} 응답 데이터
 */
const login = async (req, res) => {

  /**  요청 데이터  */
  let requestData = new RequestData(req);

  /**  응답 데이터  */
  let responseData = new ResponseData(requestData);

  try {
    /** 필수 입력 필드 체크 */
    const fieldList = [
      DB_FIELD_NAME.USER_ID,
      DB_FIELD_NAME.PASSWORD,
    ];

    if (!requestData.hasAllMandatoryFields(fieldList)) {
      return responseData.setResponseCode(RESPONSE_CODE.REQUIRED_FIELD);
    }

    /**  트랜젝션 여부 셋팅   */
    await requestData.start(false);

    /**  로그인 정보 조회    */
    const userInfo = await UserModel.selectUser(requestData, requestData.getBodyValue(DB_FIELD_NAME.USER_ID));

    /**  사용자 정보가 없는 경우  */
    if (userInfo == null) {
      return responseData.setResponseCode(RESPONSE_CODE.WRONG_ACCOUNT);
    }

    /** 비밀번호 체크 */
    let password = requestData.getBodyValue(DB_FIELD_NAME.PASSWORD);

    const dbPassword = userInfo[DB_FIELD_NAME.PASSWORD];

    /** 입력 받은 비밀번호 암호화 */
    password = await Util.makeSHA256(password);

    /** 비밀번호와 다른 경우 */
    if (password !== dbPassword) {
      return responseData.setResponseCode(RESPONSE_CODE.WRONG_PASSWORD);
    }

    /**View 권한 조회**/
    const viewAuth = await UserModel.viewAuth(requestData, userInfo[DB_FIELD_NAME.UUID]);
    //viewAuth2 = 가공(viewAuth)
    //userInfo.viewAuth = viewAuth2;
    const trimViewAuth = await UserModel.trimJson(viewAuth);

    // userInfo.viewAuth = viewAuth;
    userInfo.viewAuth = trimViewAuth;
    /** 응답 객체 생성 */
    let payload = new PayloadData();
    payload.loadObject(userInfo);

    const payloadObject = payload.getObject();
    const token = JWT.getJWTToken(payloadObject);
    const refresh_token = JWT.getRefreshJWTToken(payloadObject);

    req.session.user = { ...userInfo };

    // requestData.userInfo = { ...userInfo };
    /*
    app.get('/set-refresh_token', (req, res) => {
      res.cookie('refresh_token', refresh_token, { maxAge: 3600000, httpOnly: true });
      res.send('쿠키가 설정되었습니다!');
    });
    */

    // responseData.setDataValue(RESPONSE_FIELD.DATA, token);
    responseData.setDataValue("token", token);
    // responseData.setDataValue("refresh_token", refresh_token);


    responseData.setDataValue(RESPONSE_FIELD.DATA, userInfo);
  }
  catch (e) {
    Logger.error(e.stack);
    /** 트랜잭션 롤백  */
    await requestData.error();
    responseData.setResponseErrCode(RESPONSE_CODE.CONTACT_ADMIN, e.stack);

  }
  finally {
    /** 트랜잭션 종료 */
    await requestData.end(responseData.isSuccess());
    /** 데이터 응답 */
    res.send(responseData);
  }
};

const controller = async (req, res) => {

  /**  요청 데이터  */
  let requestData = new RequestData(req);

  /**  응답 데이터  */
  let responseData = new ResponseData(requestData);

  try {

    /** 필수 입력 필드 체크 */
    // const fieldList = [
    //   DB_FIELD_NAME.USER_ID,
    // ];

    /**  트랜젝션 여부 셋팅   */
    await requestData.start(false);

    /**  로그인 정보 조회    */

    const drivespot = await UserModel.test(requestData);
    // const userInfo = await UserModel.selectUser(requestData, requestData.getBodyValue(DB_FIELD_NAME.USER_ID));

    // req.session.user = {...userInfo};
    responseData.setDataValue(RESPONSE_FIELD.DATA, drivespot);
  }
  catch (e) {
    Logger.error(e.stack);
    /** 트랜잭션 롤백  */
    await requestData.error();
    responseData.setResponseErrCode(RESPONSE_CODE.CONTACT_ADMIN, e.stack);
  }
  finally {
    /** 트랜잭션 종료 */
    await requestData.end(responseData.isSuccess());
    /** 데이터 응답 */
    res.send(responseData);
  }
};

const insertSpot = async (req, res) => {

  /**  요청 데이터  */
  let requestData = new RequestData(req);

  /**  응답 데이터  */
  let responseData = new ResponseData(requestData);

  try {

    /** 필수 입력 필드 체크 */
    // const fieldList = [
    //   DB_FIELD_NAME.USER_ID,
    // ];

    /**  트랜젝션 여부 셋팅   */
    await requestData.start(false);

    /**  로그인 정보 조회    */

    const drivespot = await UserModel.insertSpot(requestData, req.body);
    // const userInfo = await UserModel.selectUser(requestData, requestData.getBodyValue(DB_FIELD_NAME.USER_ID));
    if(drivespot){
      responseData.setResponseCode(RESPONSE_CODE.SUCCESS);
      responseData.setDataValue(RESPONSE_FIELD.DATA, drivespot);
    }
    else {
      responseData.setResponseCode(RESPONSE_CODE.DB_ERROR);
    }
    // req.session.user = {...userInfo};
  }
  catch (e) {
    Logger.error(e.stack);
    /** 트랜잭션 롤백  */
    await requestData.error();
    responseData.setResponseErrCode(RESPONSE_CODE.CONTACT_ADMIN, e.stack);
  }
  finally {
    /** 트랜잭션 종료 */
    await requestData.end(responseData.isSuccess());
    /** 데이터 응답 */
    res.send(responseData);
  }
};

const selectAllSpot = async (req, res) => {

  /**  요청 데이터  */
  let requestData = new RequestData(req);

  /**  응답 데이터  */
  let responseData = new ResponseData(requestData);

  try {

    /** 필수 입력 필드 체크 */
    // const fieldList = [
    //   DB_FIELD_NAME.USER_ID,
    // ];

    /**  트랜젝션 여부 셋팅   */
    await requestData.start(false);

    /**  로그인 정보 조회    */

    const drivespot = await UserModel.selectAllSpot(requestData);
    // const userInfo = await UserModel.selectUser(requestData, requestData.getBodyValue(DB_FIELD_NAME.USER_ID));

    // req.session.user = {...userInfo};
    responseData.setDataValue(RESPONSE_FIELD.DATA, drivespot);
  }
  catch (e) {
    Logger.error(e.stack);
    /** 트랜잭션 롤백  */
    await requestData.error();
    responseData.setResponseErrCode(RESPONSE_CODE.CONTACT_ADMIN, e.stack);
  }
  finally {
    /** 트랜잭션 종료 */
    await requestData.end(responseData.isSuccess());
    /** 데이터 응답 */
    res.send(responseData);
  }
};

module.exports = {
  signUp,
  login,
  controller,
  insertSpot,
  selectAllSpot,
};

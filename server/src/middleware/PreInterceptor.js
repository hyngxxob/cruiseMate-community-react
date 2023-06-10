/** constant          */
const { HTTP_REQUEST } = require('../common/Constant');
const RequestData                       = require('../common/RequestData');
const ResponseData = require("../common/ResponseData");
/** 인증 예외  API     */
const { RequestAuthPass } = require('../common/RequestAuthPass');

const { getPayload ,checkSession } = require('../lib/jwt');
const { DATA_FIELD_NAME } = require("../common/Constant");
const { StatusCodes } = require("http-status-codes");
const { RESPONSE_FIELD, RESPONSE_CODE } = require("../common/ResponseConst");

const JWT = require('../lib/jwt');
const jsonwebtoken = require('jsonwebtoken');

const UserModel = require('../model/user/UserModel');

/**
 * namespace middleware
 * property {module:middleware/PreInterceptor} PreInterceptor - 선처리 interceptor
 */

/**
 *  선처리 interceptor
 *  module       middleware/PreInterceptor
 *  author       SUNGWONLEE
 *  version      1.0, 작업 내용
 */

const PreInterceptor = async (req, res, next) => {

  /** swagger  */
  if (req.originalUrl.startsWith("/api-docs")) {
    return next();
  }

  console.log("=============PreInterceptor 진입 전===========");
  console.log(JSON.stringify(req.session));






  /** 인증 예외  API 를 확인, method 와 요청 URL 체크 */
  if (RequestAuthPass.some(api => req.method === api[HTTP_REQUEST.METHOD] && req.originalUrl === api[HTTP_REQUEST.URL])) {
    return next();
  }

  /** 토큰 체크  */
 // const responseData = getPayload(req);
  const responseData = checkSession(req);
  
  /** 인증 체크에 성공하였을 때 데이터 셋탕하고 다음 단계  */
  if (responseData.getResponseCode() === StatusCodes.OK) {
    const payload = responseData.getDataValue(DATA_FIELD_NAME.PAYLOAD);
    // jwt decode 값을 request 객체에 보관
    req[DATA_FIELD_NAME.PAYLOAD] = payload;
    return next();

  }
  else {
    /** 에러 응답 */
    const data = responseData.getData();
    /*
    const refreshToken = req.cookies.refresh_token; // refresh_token 가져오기
    if (refreshToken) {
      try {
        const payload = jsonwebtoken.verify(refreshToken, process.env.SECRET_KEY); // 토큰 검증
        // const payload = decoded.payload;
        req[DATA_FIELD_NAME.PAYLOAD] = payload;


        const token = JWT.getJWTToken(payload); // 새로운 토큰 발급
        responseData.setDataValue("token", token); // 발급된 토큰을 responseData에 셋팅

        //로그인 정보 조회
        const userInfo = await UserModel.selectUser(requestData, requestData.getBodyValue(DB_FIELD_NAME.USER_ID));
        req.session.user = { ...userInfo };
        responseData.setDataValue(RESPONSE_FIELD.DATA, userInfo);


        return next();
      } catch (error) {
        // 토큰이 유효하지 않은 경우 처리할 작업 수행
        // 예를 들어, 에러 응답 등
        data[RESPONSE_FIELD.CODE] = StatusCodes.UNAUTHORIZED; // 인증 실패 상태 코드
        data[RESPONSE_FIELD.MESSAGE] = 'Invalid refresh token'; // 인증 실패 메시지

        if (data.hasOwnProperty(RESPONSE_FIELD.CODE)) {
          res.status(data[RESPONSE_FIELD.CODE]);
          delete data[RESPONSE_FIELD.CODE];
        }

      }
    }
    */
    //return; 
    res.send(data);
  }
};

module.exports = PreInterceptor;

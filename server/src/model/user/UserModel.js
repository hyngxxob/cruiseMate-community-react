/**
 *  사용자 데이터 처리
 *  @module       model/user/UserModel
 *  @author       HYUNGSEOBKIM
 *  @version      1.0
 */

// const Logger            = require('../../lib/logger');

// myBatis
// const Query             = require('../../database/Mybatis');

// 상수 관련 define
// const { NAMESPACE, DB_RESULT, DB_FIELD_NAME } = require('../../common/Constant');
const { request } = require('express');

/**
 * 사용자 조회
 * description 사용자 ID로 사용자 조회
 * param {RequestData} requestData 요청 데이터
 * param {String} 사용자 아이디
 * returns {Object|undefined} 사용자 정보 객체
 */
const selectUser = async (requestData, ID = null) => {
  try {

    let userID    = null ;

    /**  입력받은 아이디로 사용한다면 받은 아이디로 사용하고 */
    if(ID !== null){
      userID = ID;
    }
    else{
      userID = requestData.getUserID();
    }

    /**  sql parameter 설정  */
    const params = {
      [DB_FIELD_NAME.USER_ID] :  userID ,
    };

    /**  connection 객체  */
    const connection = requestData.getConnection();

    /**  query 문장       */
    const queryString = Query(NAMESPACE.USER,'selectUser', params);

    /**  query 실행       */
    const dataSet = await connection.exec(queryString);

    /**  첫번째 레코드     */
      return dataSet[DB_RESULT.ROW_FIRST];
    //commitTest --mj.kim  ------ HYHY
  }
  catch (e) {
    Logger.error(e.stack);
    throw e;
  }
};


const viewAuth = async ( requestData, UUID = null) => {
  try {

    let userID    = null ;

    if(UUID == null){
      UUID = "X";
    }

    /**  sql parameter 설정  */
    const params = {
      [DB_FIELD_NAME.UUID] :  UUID ,
    };

    /**  connection 객체  */
    const connection = requestData.getConnection();

    /**  query 문장       */
    const queryString = Query(NAMESPACE.USER,'viewAuth', params);

    /**  query 실행       */
    const dataSet = await connection.exec(queryString);

    return dataSet;
  }
  catch (e) {
    Logger.error(e.stack);
    throw e;
  }
};

/**
 *  사용자 생성 (회원 가입)
 * @description 사용자 정보로 회원 가입 처리
 * @param {RequestData} requestData 요청 데이터
 * @returns {boolean} 성공 여부
 */
const insertUser = async (requestData) => {

  try {
    /**  입력받은 정보    */
    const userID    = requestData.getBodyValue(DB_FIELD_NAME.USER_ID);
    const password  = requestData.getBodyValue(DB_FIELD_NAME.PASSWORD);
    const userName  = requestData.getBodyValue(DB_FIELD_NAME.USER_NAME);
    const userEmail  = requestData.getBodyValue(DB_FIELD_NAME.USER_EMAIL);
    const userPhoneNum  = requestData.getBodyValue(DB_FIELD_NAME.USER_PHONENUM);
    const createDate  = requestData.getBodyValue(DB_FIELD_NAME.CREATE_DATE);
    // const salt      = requestData.getBodyValue(DB_FIELD_NAME.SALT);

    /** SQL parameter   */
    const params = {
      [DB_FIELD_NAME.USER_ID]   : userID,
      [DB_FIELD_NAME.PASSWORD]  : password,
      [DB_FIELD_NAME.USER_NAME] : userName,
      [DB_FIELD_NAME.USER_EMAIL] : userEmail,
      [DB_FIELD_NAME.USER_PHONENUM] : userPhoneNum
      // [DB_FIELD_NAME.SALT]      : salt,
    };

    /**  connection 객체  */
    const connection = requestData.getConnection();

    /**  query 문장       */
    const statement = Query(NAMESPACE.USER,'insertUser', params);
    // const res = await connection.query(statement);
    const res = await connection.exec(statement);

    // return res[DB_RESULT.ROW_FIRST][DB_RESULT.AFFECTED_ROWS] === DB_RESULT.ONE;
    return res;
  }
  catch (e) {
    Logger.error(e.stack);
    throw e;
  }
};

/**
 *  사용자 추가 후 권한 할당
 * @description 사용자 정보로 회원 가입 처리
 * @param {RequestData} requestData 요청 데이터
 * @returns {boolean} 성공 여부
 */
const assignUserRole = async (requestData, data) => {

  try {
    /**  입력받은 정보    */
    // const userID    = requestData.getBodyValue(DB_FIELD_NAME.USER_ID);
    // const password  = requestData.getBodyValue(DB_FIELD_NAME.PASSWORD);
    // const userName  = requestData.getBodyValue(DB_FIELD_NAME.USER_NAME);
    // const salt      = requestData.getBodyValue(DB_FIELD_NAME.SALT);
    // 회원가입한 유저의 UUID 필요
    const userUUID = data.UUID;

    /** SQL parameter   */
    const params = {
      [DB_FIELD_NAME.UUID]   : userUUID,
    };

    /**  connection 객체  */
    const connection = requestData.getConnection();

    /**  query 문장       */
    const statement = Query(NAMESPACE.USER,'assignInitUserRole', params);
    // const res = await connection.query(statement);
    const res = await connection.exec(statement);

    // return res[DB_RESULT.ROW_FIRST][DB_RESULT.AFFECTED_ROWS] === DB_RESULT.ONE;
    return 0;
  }
  catch (e) {
    Logger.error(e.stack);
    throw e;
  }
};

/**
 *  사용자 삭제시 권한 할당 제거
 * @description 사용자 정보로 회원 가입 처리
 * @param {RequestData} requestData 요청 데이터
 * @returns {boolean} 성공 여부
 */
const deleteWithdrawalUserRole = async (requestData, data) => {

  try {
    /**  입력받은 정보    */
    // const userID    = requestData.getBodyValue(DB_FIELD_NAME.USER_ID);
    // const password  = requestData.getBodyValue(DB_FIELD_NAME.PASSWORD);
    // const userName  = requestData.getBodyValue(DB_FIELD_NAME.USER_NAME);
    // const salt      = requestData.getBodyValue(DB_FIELD_NAME.SALT);
    // 회원가입한 유저의 UUID 필요
    const userUUID = data.UUID;

    /** SQL parameter   */
    const params = {
      [DB_FIELD_NAME.UUID]   : userUUID,
    };

    /**  connection 객체  */
    const connection = requestData.getConnection();

    /**  query 문장       */
    const statement = Query(NAMESPACE.USER,'deleteWithdrawalUserRole', params);
    // const res = await connection.query(statement);
    const res = await connection.exec(statement);

    // return res[DB_RESULT.ROW_FIRST][DB_RESULT.AFFECTED_ROWS] === DB_RESULT.ONE;
    return 0;
  }
  catch (e) {
    Logger.error(e.stack);
    throw e;
  }
};


/**
 *  사용자 데이터 변경 하기
 *  @param {RequestData} requestData  -  요청 데이터
 *  @param  {Object} params           -  변경 정보가 있는 객체
 *  @return {boolean}                 -  업데이트 정상 처리 여부
 */
const updateUser = async (requestData, params) => {

  try {
    params.USER_UUID = requestData.getUserUUID();
    
    /**  connection 객체  */
    const connection = requestData.getConnection();

    /**  query 문장       */
    const statement = Query(NAMESPACE.USER,'updateUser', params);
    const res = await connection.exec(statement);

    // return res[DB_RESULT.ROW_FIRST][DB_RESULT.AFFECTED_ROWS] === DB_RESULT.ONE;
    return res;
  }
  catch (e) {
    Logger.error(e.stack);
    throw e;
  }
};

/**
 *  사용자 데이터 삭제
 *  @param {RequestData} requestData  -  요청 데이터
 *  @param  {Object} params           -  삭제 정보가 있는 객체
 *  @return {boolean}                 -  삭제 정상 처리 여부
 */
const deleteUser = async (requestData) => {

  try {

    /**  입력받은 정보    */
    const userID    = requestData.getUserID();

    const userPw    = requestData.body.PWD;

    /**  connection 객체  */
    const connection = requestData.getConnection();

    /** SQL parameter   */
    const params = {
      [DB_FIELD_NAME.USER_ID]   : userID,
      [DB_FIELD_NAME.PASSWORD]   : userPw,
    };

    /**  query 문장       */
    const statement = Query(NAMESPACE.USER,'deleteUser', params);
    const res = await connection.exec(statement);
    // console.log("res 결과");
    // console.log(res);
    
    // return res[DB_RESULT.ROW_FIRST][DB_RESULT.AFFECTED_ROWS] === DB_RESULT.ONE;
    return 0;
  }
  catch (e) {
    Logger.error(e.stack);
    throw e;
  }
};

const trimJson = async (requestData) => {
  try {
    const h1 = []; // PAR_UUID 없는 것
    const h2 = []; // PAR_UUID 있는 것
    const del = [];
    for (let i=0; i<requestData.length; i++) {
      if(requestData[i].PAR_UUID == null || requestData[i].PAR_UUID == '' ) {
        h1.push(requestData[i]);        
       
      } else {
        h1.push(requestData[i]);
        h2.push(requestData[i]);
      }
    }
    
  

    for (let i =0; i<h1.length; i++) {
      let temp = [];
      for ( let j=0; j<h2.length; j++) {
        if(h2[j].PAR_UUID == h1[i].UUID ) {
         temp.push(h2[j]);
         del.push(h2[j]);
          // h1[i].VIEW_PATH = temp;
        }
      }
      temp.sort((a,b)=> {
        return a.SEQ < b.SEQ ? -1 : a.SEQ > b.SEQ ? 1 : 0;
      })
      h1[i].SUB_VIEW = temp;
    }
    for ( let j=0; j<del.length; j++) {
      for(let i=0; i<h1.length; i++) {
      
        if(h1[i].UUID == del[j].UUID ){
          h1.splice(i,1);          
          break;
        }
      
      }
    }

    
    h1.sort((a,b)=> {
      return a.SEQ < b.SEQ ? -1 : a.SEQ > b.SEQ ? 1 : 0;
    })
    return h1;
  }
  catch (e) {
    Logger.error(e.stack);
    throw e;
  }
};

/**
 *  공지사항 가져오기
 *  @param {RequestData} requestData  -  요청 데이터
 *  @param  {Object} params           -  삭제 정보가 있는 객체
 *  @return {boolean}                 -  삭제 정상 처리 여부
 */
const noticeAll = async (requestData) => {

  try {
    /**  connection 객체  */
    const connection = requestData.getConnection();

    /**  query 문장       */
    const statement = Query(NAMESPACE.USER,'noticeAll');
    const res = await connection.exec(statement);

    // return res[DB_RESULT.ROW_FIRST][DB_RESULT.AFFECTED_ROWS] === DB_RESULT.ONE;
    return res;
  }
  catch (e) {
    Logger.error(e.stack);
    throw e;
  }
};

/**
 *  게시판 가져오기
 *  @param {RequestData} requestData  -  요청 데이터
 *  @param  {Object} params           -  삭제 정보가 있는 객체
 *  @return {boolean}                 -  삭제 정상 처리 여부
 */
const boardAll = async (requestData) => {

  try {
    /**  connection 객체  */
    const connection = requestData.getConnection();

    /**  query 문장       */
    const statement = Query(NAMESPACE.USER,'boardAll');
    const res = await connection.exec(statement);

    // return res[DB_RESULT.ROW_FIRST][DB_RESULT.AFFECTED_ROWS] === DB_RESULT.ONE;
    return res;
  }
  catch (e) {
    Logger.error(e.stack);
    throw e;
  }
};

/**
 *  게시판 수정
 *  @param {RequestData} requestData  -  요청 데이터
 *  @param  {Object} params           -  삭제 정보가 있는 객체
 *  @return {boolean}                 -  삭제 정상 처리 여부
 */
const editBoard = async (requestData) => {

  try {

    /**  입력받은 정보    */
    const userUUID    = requestData.getUserUUID();

    /* 게시판 id */
    const boardId   = requestData.body.BOARD_ID;

    /* 게시판 내용 */
    const boardContent   = requestData.body.BOARD_CONTENT;

    /**  connection 객체  */
    const connection = requestData.getConnection();

    /** SQL parameter   */
    const params = {
      [DB_FIELD_NAME.USER_UUID]   : userUUID,
      [DB_FIELD_NAME.BOARD_ID]   : boardId,
      [DB_FIELD_NAME.BOARD_CONTENT]   : boardContent,
    };

    /**  query 문장       */
    const statement = Query(NAMESPACE.USER,'editBoard', params);
    const res = await connection.exec(statement);

    // return res[DB_RESULT.ROW_FIRST][DB_RESULT.AFFECTED_ROWS] === DB_RESULT.ONE;
    return res;
  }
  catch (e) {
    Logger.error(e.stack);
    throw e;
  }
};

/**
 *  게시판 삭제
 *  @param {RequestData} requestData  -  요청 데이터
 *  @param  {Object} params           -  삭제 정보가 있는 객체
 *  @return {boolean}                 -  삭제 정상 처리 여부
 */
const deleteBoard = async (requestData) => {

  try {
    /* 게시판 id */
    const boardId   = requestData.body.BOARD_ID;

    /**  connection 객체  */
    const connection = requestData.getConnection();

    /** SQL parameter   */
    const params = {
      [DB_FIELD_NAME.BOARD_ID]   : boardId,
    };

    /**  query 문장       */
    const statement = Query(NAMESPACE.USER,'deleteBoard', params);
    const res = await connection.exec(statement);

    // return res[DB_RESULT.ROW_FIRST][DB_RESULT.AFFECTED_ROWS] === DB_RESULT.ONE;
    return res;
  }
  catch (e) {
    Logger.error(e.stack);
    throw e;
  }
};

/**
 *  게시판 생성
 *  @param {RequestData} requestData  -  요청 데이터
 *  @param  {Object} params           -  삭제 정보가 있는 객체
 *  @return {boolean}                 -  삭제 정상 처리 여부
 */
const createBoard = async (requestData) => {

  try {

    /**  입력받은 정보    */
    const userUUID    = requestData.getUserUUID();

    /* 게시판 id */
    const boardTitle   = requestData.body.BOARD_TITLE;

    /* 게시판 내용 */
    const boardContent   = requestData.body.BOARD_CONTENT;

    /**  connection 객체  */
    const connection = requestData.getConnection();

    /** SQL parameter   */
    const params = {
      [DB_FIELD_NAME.USER_UUID]   : userUUID,
      [DB_FIELD_NAME.BOARD_TITLE]   : boardTitle,
      [DB_FIELD_NAME.BOARD_CONTENT]   : boardContent,
    };

    /**  query 문장       */
    const statement = Query(NAMESPACE.USER,'createBoard', params);
    const res = await connection.exec(statement);

    // return res[DB_RESULT.ROW_FIRST][DB_RESULT.AFFECTED_ROWS] === DB_RESULT.ONE;
    return res;
  }
  catch (e) {
    Logger.error(e.stack);
    throw e;
  }
};


/**
 *  게시판 삭제시 댓글 전부 삭제
 *  @param {RequestData} requestData  -  요청 데이터
 *  @param  {Object} params           -  삭제 정보가 있는 객체
 *  @return {boolean}                 -  삭제 정상 처리 여부
 */
const deleteAllComment = async (requestData, query) => {

  try {
    /**  connection 객체  */
    const connection = requestData.getConnection();

    const boardUUID = requestData.body.BOARD_UUID;

    /** SQL parameter   */
    const params = {
      [DB_FIELD_NAME.BOARD_UUID]   : boardUUID,
    };

    /**  query 문장       */
    const statement = Query(NAMESPACE.USER,'deleteAllComment', params);
    const res = await connection.exec(statement);

    // return res[DB_RESULT.ROW_FIRST][DB_RESULT.AFFECTED_ROWS] === DB_RESULT.ONE;
    return res;
  }
  catch (e) {
    Logger.error(e.stack);
    throw e;
  }
};
/**
 *  게시판 가져오기
 *  @param {RequestData} requestData  -  요청 데이터
 *  @param  {Object} params           -  삭제 정보가 있는 객체
 *  @return {boolean}                 -  삭제 정상 처리 여부
 */
const getBoardComment = async (requestData, query) => {

  try {
    /**  connection 객체  */
    const connection = requestData.getConnection();

    const boardUUID = query.boardUUID;

    /** SQL parameter   */
    const params = {
      [DB_FIELD_NAME.BOARD_UUID]   : boardUUID,
    };

    /**  query 문장       */
    const statement = Query(NAMESPACE.USER,'getBoardComment', params);
    const res = await connection.exec(statement);

    // return res[DB_RESULT.ROW_FIRST][DB_RESULT.AFFECTED_ROWS] === DB_RESULT.ONE;
    return res;
  }
  catch (e) {
    Logger.error(e.stack);
    throw e;
  }
};

/**
 *  게시판 댓글 입력
 *  @param {RequestData} requestData  -  요청 데이터
 *  @param  {Object} params           -  삭제 정보가 있는 객체
 *  @return {boolean}                 -  삭제 정상 처리 여부
 */
const postBoardComment = async (requestData) => {

  try {
    /**  입력받은 정보    */
    const userUUID    = requestData.getUserUUID();

    const boardUUID = requestData.body.BOARD_UUID;

    const commentContent = requestData.body.COMMENT_CONTENT;

    /**  connection 객체  */
    const connection = requestData.getConnection();

    /** SQL parameter   */
    const params = {
      [DB_FIELD_NAME.USER_UUID]   : userUUID,
      [DB_FIELD_NAME.BOARD_UUID]   : boardUUID,
      [DB_FIELD_NAME.COMMENT_CONTENT]   : commentContent
    };

    /**  query 문장       */
    const statement = Query(NAMESPACE.USER,'postBoardComment', params);
    const res = await connection.exec(statement);

    // return res[DB_RESULT.ROW_FIRST][DB_RESULT.AFFECTED_ROWS] === DB_RESULT.ONE;
    return res;
  }
  catch (e) {
    Logger.error(e.stack);
    throw e;
  }
};



/**
 *  메뉴 List 조회
 *  @param {RequestData} requestData  -  요청 데이터
 *  @param  {Object} params           -  삭제 정보가 있는 객체
 *  @return {boolean}                 -  삭제 정상 처리 여부
 */
const getUserManuList = async (requestData) => {

  try {
    /**  입력받은 정보    */
    const userID = requestData.getUserID();
    
    const viewPath = requestData.body.VIEW_PATH;

    const viewName = requestData.body.VIEW_NAME;

    const viewIcon = requestData.body.VIEW_ICON;
    
    /**  connection 객체  */
    const connection = requestData.getConnection();


    /** SQL parameter   */
    const params = {
      [DB_FIELD_NAME.USER_ID]: userID,
      [DB_FIELD_NAME.VIEW_PATH]: viewPath,
      [DB_FIELD_NAME.VIEW_NAME]: viewName,
      [DB_FIELD_NAME.VIEW_ICON]: viewIcon,
    };

    /**  query 문장       */
    const statement = Query(NAMESPACE.USER, 'getUserManuList', params);
    const res = await connection.exec(statement);

    // return res[DB_RESULT.ROW_FIRST][DB_RESULT.AFFECTED_ROWS] === DB_RESULT.ONE;
    return res;
  }
  catch (e) {
    Logger.error(e.stack);
    throw e;
  }
};

/**
 * test
 *  @param {RequestData} requestData  -  요청 데이터
 *  @param  {Object} params           -  삭제 정보가 있는 객체
 *  @return {boolean}                 -  삭제 정상 처리 여부
 */
const test = async (requestData) => {

  try {
    /**  connection 객체  */
    const connection = requestData.getConnection();

    /**  query 문장       */
    // const statement = Query(NAMESPACE.USER, 'test');
    const statement = "SELECT * FROM drivespot";
    const res = await connection.query(statement);

    // return res[DB_RESULT.ROW_FIRST][DB_RESULT.AFFECTED_ROWS] === DB_RESULT.ONE;
    return res[0];
  }
  catch (e) {
    Logger.error(e.stack);
    throw e;
  }
};


module.exports = {
  selectUser                  ,
  viewAuth                    ,
  insertUser                  ,
  updateUser                  ,
  deleteUser                  ,
  trimJson                    ,
  noticeAll                   ,
  assignUserRole              ,
  deleteWithdrawalUserRole    ,
  boardAll        ,
  editBoard       ,
  createBoard     ,
  deleteBoard     ,
  getBoardComment ,
  postBoardComment,
  deleteAllComment,
  getUserManuList,
  test,
};

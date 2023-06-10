/**
 *  데이터 베이스 필드명
 *  @constant {object}
 */
const DB_FIELD_NAME = {
    CREATE_DATE: 'CREATE_DATE',
    CREATED_DATE: 'CREATED_DATE',
    USER_ID: 'ID',
    USER_UUID: 'USER_UUID',
    USER_NAME: 'USERNAME',
    USER_EMAIL: 'USER_EMAIL',
    USER_PHONENUM: 'USER_PHONENUM',
    NOTICE_TITLE: 'NOTICE_TITLE',
    NOTICE_CONTENT: 'NOTICE_CONTENT',
    BOARD_TITLE: 'BOARD_TITLE',
    BOARD_UUID: 'BOARD_UUID',
    BOARD_ID: 'BOARD_ID',
    BOARD_CONTENT: 'BOARD_CONTENT',
    COMMENT_CONTENT: 'COMMENT_CONTENT',
    COMMENT_CREATED_AT: 'COMMENT_CREATED_AT',
    COMMENT_UPDATED_AT: 'COMMENT_UPDATED_AT',
    ROLE_UUID: 'ROLE_UUID',
    PASSWORD: 'PWD',
    SALT: 'salt',
    UUID: 'UUID',
    VIEW_PATH: "VIEW_PATH",
    VIEW_NAME: "VIEW_NAME",
    VIEW_ICON: "VIEW_ICON",
  
    /* 응답 데이터 */
    VIEW_LIST: 'VIEW_LIST',
    EMPLOYEE_LIST: 'EMPLOYEE_LIST',
    ROLE_HEADER: 'ROLE_HEADER',
  
    /*공통 코드 데이터*/
    GROUP_CD: 'GROUP_CD',
    GROUP_CD_DESC: 'GROUP_CD_DESC',
    CODE_CD: 'CODE_CD',
    CODE_CD_DESC: 'CODE_CD_DESC',
    CODE_SEQ: 'CODE_SEQ',
    PAR_CODE_CD: 'PAR_CODE_CD',
    CREATE_BY: 'CREATE_BY',
    MODIFY_BY: 'MODIFY_BY',
    LANG: 'LANG',
  
  
  
  };
  
  /**
   *  database query 결과 정보
   *  @constant {object}
   */
  const DB_RESULT = {
    ROW_FIRST: 0,              // 첫번째 레코드
    AFFECTED_ROWS: 'affectedRows',   // 영향을 받은 record
    INSERT_ID: 'insertId',   // insert id
    WARNING_STATUS: 'warningStatus',   // warning
    ONE: 1,   // 결과 1건
  };
  
  /**
   *  데이터 상태 정보
   *  @constant {object}
   */
  const DB_STATE = {
    CLOSE: 0,          // Close
    OPEN: 1,          // 정상
    LOCK: 2,          // 잠김
    DELETE: 3,          // 삭제
  
    YES: 'Y',
    NO: 'N',
  };
  
  /**
   *  숫자 상수
   *  @constant {object}
   */
  const NUMERIC = {
    ZERO: 0,
    ONE: 1,
    TWO: 2,
  };
  
  /**
   *  local data 에서 사용하는 필드 상수
   *  @constant {object}
   */
  const DATA_FIELD_NAME = {
    AUTHORIZATION: 'authorization',
    BEARER: 'Bearer ',
    JWT_DECODE: 'jwtDecode',
    TOKEN: 'token',
    PAGE: 'page',
    PAGE_SIZE: 'pageSize',
    SKIP: 'pageSkip',
  
    PAYLOAD: 'payload',
    DATA: 'data',
    BODY: 'body',
  };
  
  
  /**
   *  design sql mapper 를 사용하기 위한  namespace
   *  @constant {object}
   */
  const NAMESPACE = {
    USER: 'USER',
    ADMIN: 'ADMIN',
    BP: 'BP',
    COMMONCODE: 'COMMONCODE',
  };
  
  /**
   *  페이징 default value
   *  @constant {object}
   */
  const PAGING_DEFAULT = {
    [DATA_FIELD_NAME.PAGE]: 1,
    [DATA_FIELD_NAME.PAGE_SIZE]: 10,
  };
  
  /**
   * 시간 형태
   *  @constant {object}
   */
  const DATE_FORMAT = {
    YYYY_MM_DD: 'YYYY-MM-DD',
    YYYY_MM_DD_H_MM_SS: 'YYYY-MM-DD h:mm:ss',
  }
  
  /**
   *  HTTP 요청 객체 정보 상수
   *  @constant {object}
   */
  const HTTP_REQUEST = {
    METHOD: 'METHOD',     /** 요청 메소드    */
    URL: 'URL',     /** 요청 URL      */
  };
  
  const BP_REQUEST = {
    HEADER: [{
      UUID: 'UUID',
      NAME: 'NAME',
      STATUS: 'STATUS',
      BP_TYPE: 'EMPL',
      DEL_FLAG: false
    }]
  }
  
  
  module.exports = {
    DB_FIELD_NAME,
    DATA_FIELD_NAME,
    DB_RESULT,
    NUMERIC,
    DB_STATE,
    NAMESPACE,
    PAGING_DEFAULT,
    DATE_FORMAT,
    HTTP_REQUEST,
    BP_REQUEST,
  };
  
  
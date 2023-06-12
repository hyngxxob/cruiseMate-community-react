/** config file 위치 지정 설정 */
require('dotenv').config(({ path: (__dirname + '/config/.env') }));

const express = require('express')

// express 는 함수이므로, 반환값을 변수에 저장한다.
const app = express()
const cors = require('cors');
const routes = require("./routes");      /** router  모듈 사용  */

const PreInterceptor = require('./middleware/PreInterceptor');
const PostInterceptor = require('./middleware/PostInterceptor');

const cookieParser = require('cookie-parser');
const session = require("express-session");

const maxAge = 1000 * 60 * 10;
const MemoryStore = require('memorystore')(session);

const sessionObj =  {
    secret: 'JMCKOREA2023',
    resave: false,  
    saveUninitialized: true,
    //store: new RedisStore(redisStoreInfo),new MemoryStore({ checkPeriod: maxAge }),
    store: new MemoryStore({ checkPeriod: maxAge }),
    // store: new FileStore(),
    cookie: {
      maxAge,
      httpOnly : true,
      path: "/",
      sameSite: 'Lax',
      secure : false
      // sameSite: 'none'
    },
    rolling : true
};
  
const corsOptions = {
    origin: true,
    // secure: true,
    secure : false,
    credentials: true
  };
  

app.use(
session(sessionObj)
);

app.use(cors(corsOptions));

app.use(function (req, res, next) {
    // var allowedDomains = ['http://localhost:3001','http://localhost:W' ];
    var origin = req.headers.origin;
    // console.log("origin : " + origin);
    //  if(allowedDomains.indexOf(origin) > -1){
    if(req.headers.origin.indexOf('localhost') > 0 && req.headers.host.indexOf('localhost') > 0) {
      res.setHeader('Access-Control-Allow-Origin', '*');
    } else {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }
    // res.setHeader('Access-Control-Allow-Origin', '*');
    // res.setHeader('Access-Control-Allow-Origin', origin);
    // }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})  

app.use(cookieParser());

/** express 에서 JSON Request Body parsing  */
app.use(express.json());


/** 전처리 interceptor */
app.use(PreInterceptor);
app.use(PostInterceptor);

  

/** 라우트 등록  */
app.use(routes);

 

var port = normalizePort(process.env.PORT);
if(port === undefined) {
  port = "3100";
} else {
  app.set('port', port);
}

function normalizePort(val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) {
      // named pipe
      return val;
    }
    if (port >= 0) {
      // port number
      return port;
    }
    return false;
}
  
app.listen(port, () => {
    console.log(`Server listening... on port ` + port)
});
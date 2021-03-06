import 'isomorphic-fetch';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import path from 'path';
import mongoose from 'mongoose';
import configure from './configure';
// haha 양기엽 뮤뮤 ㄴㄴㄴ ㅁㅁㅁ ㄴㄴㄴ 
// api 라우트 로드
import api from './routes';

// 인증
import auth from './auth';

// 서버와 포트 초기화
const app = express();
const port = configure.PORT;

// 몽고디비 연결 설정
const db = mongoose.connection;
mongoose.connect(configure.MONGO_URL, {
  useMongoClient: true,
});

// Mongoose 모듈의 Promise 변경 - 모듈 권고사항 (deprecated)
mongoose.Promise = global.Promise;

// 몽고디비 연결
db.on('error', console.error);
db.once('open', () => {
  console.log(`MongoDB is connected : ${configure.MONGO_URL}`);
});

// POST 연결을 위한 설정
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));
app.use(bodyParser.json({ limit: '5mb' }));
app.enable('trust proxy');

// 정적 파일 라우트
app.use('/', express.static(path.join(__dirname, './../public')));

/*
const whitelist = ['http://localhost:3000', 'http://localhost'];

const corsOptions = {
  origin(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, true);

      // callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
*/
// 쿠키 사용
app.use(cookieParser());

// POST 연결을 위한 설정
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));
app.use(bodyParser.json({ limit: '5mb' }));
app.enable('trust proxy');

const sessionConfig = {
  secret: configure.SECRET,
  resave: false,
  saveUninitialized: false,
};
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
app.use(auth);

// API 라우트
app.use('/api', api);

// index 라우팅
app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

// 404 에러
app.use((req, res) => {
  res.status(404).send('NOT FOUND');
});

// 서버 시작
app.listen(port, () => {
  console.log(`Server is listening on this port : ${port}`);
});

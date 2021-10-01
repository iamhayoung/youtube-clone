import express from 'express';
import {
  getJoin,
  postJoin,
  getLogin,
  postLogin,
} from '../controllers/userController';
import { home, search } from '../controllers/videoController';

// express.Router(): 라우터 생성
const rootRouter = express.Router();

// get request: 브라우저가 서버에게 이 Route("/", "/login", "/profile" 등등...)를 '가져달라'고 get request를 보냄
rootRouter.get('/', home);
rootRouter.route('/join').get(getJoin).post(postJoin);
rootRouter.route('/login').get(getLogin).post(postLogin);
rootRouter.get('/search', search);

export default rootRouter;

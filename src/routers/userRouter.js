import express from 'express';
import {
  logout,
  getEdit,
  postEdit,
  remove,
  see,
} from '../controllers/userController';
import { protectorMiddleware } from '../middlewares';

const userRouter = express.Router();

// userRouter의 안이기 때문에 /user/edit이 아닌 /edit만 써도됨. /users를 따로 써줄 필요없음
userRouter.get('/logout', logout);
userRouter.route('/edit').all(protectorMiddleware).get(getEdit).post(postEdit);
userRouter.get('/remove', remove);
userRouter.get('/:id', see);

export default userRouter;

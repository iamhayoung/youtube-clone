import express from 'express';
import {
  logout,
  getEdit,
  postEdit,
  remove,
  see,
} from '../controllers/userController';
import { protectorMiddleware, avatarUpload } from '../middlewares';

const userRouter = express.Router();

// userRouter의 안이기 때문에 /user/edit이 아닌 /edit만 써도됨. /users를 따로 써줄 필요없음
userRouter.get('/logout', logout);
userRouter
  .route('/edit')
  .all(protectorMiddleware)
  .get(getEdit)
  // multer avatarUpload 미들웨어가 input name avatar의 파일을 받아서 그 파일을 uploads 폴더에 저장한 다음, postEdit으로 전달함
  .post(avatarUpload.single('avatar'), postEdit); // single: 하나의 파일만 업로드, input name avatar의 파일을 업로드
userRouter.get('/remove', remove);
userRouter.get('/:id', see);

export default userRouter;

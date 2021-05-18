import express from "express";
import { edit, remove } from "../controllers/userController";

const userRouter = express.Router();

// userRouter의 안이기 때문에 /user/edit이 아닌 /edit만 써도됨. /users를 따로 써줄 필요없음
userRouter.get("/edit", edit);
userRouter.get("/remove", remove);

export default userRouter;
import express from "express";
import { join, login } from "../controllers/userController";
import { home, search } from "../controllers/videoController";

// express.Router(): 라우터 생성
const globalRouter = express.Router();

// get request: 브라우저가 서버에게 이 Route("/", "/login", "/profile" 등등...)를 '가져달라'고 get request를 보냄
globalRouter.get("/", home);
globalRouter.get("/join", join);
globalRouter.get("/login", login);

export default globalRouter;
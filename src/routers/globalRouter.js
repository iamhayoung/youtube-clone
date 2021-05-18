import express from "express";
import { join } from "../controllers/userController";
import { trending } from "../controllers/videoController";

// express.Router(): 라우터 생성
const globalRouter = express.Router();

globalRouter.get("/", trending); // request
globalRouter.get("/join", join);

export default globalRouter;
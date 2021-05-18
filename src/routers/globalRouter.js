import express from "express";

// express.Router(): 라우터 생성
const globalRouter = express.Router();

const handleHome = (req, res) => res.send("Home");

globalRouter.get("/", handleHome); // request

export default globalRouter;
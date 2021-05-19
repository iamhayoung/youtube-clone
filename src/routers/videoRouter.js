import express from "express";
import { upload, watch, edit, deleteVideo } from "../controllers/videoController";

const videoRouter = express.Router();

// :id(\\d+)는 parameter라고 함. 파라미터는 url안에 변수를 넣는것을 허용해줌
// :을 사용하는건 express에게 이게 변수라는 것을 알려주기 위해서임
// express가 req Object에 parameter값을 보내줌
// console.log(req.params)으로 실제 id 번호를 확인할 수 있음
// parameter를 안쓰는 라우터(/upload)를 가장 위에 올려야함
// parameter를 사용하는 라우터(/:id(\\d+))의 밑에 /upload를 두면,
// express가 upload라는 글자를 id 파라메터로 인식해버리기 때문
// (\\d+)는 정규표현. id에 숫자만 들어갈수 있게함
// 정규 표현을 추가해주면 /upload가 맨밑으로 가도됨. upload는 숫자가 아니기 때문에
videoRouter.get("/:id(\\d+)", watch);
videoRouter.get("/:id(\\d+)/edit", edit);
videoRouter.get("/:id(\\d+)/delete", deleteVideo);
videoRouter.get("/upload", upload);

export default videoRouter;
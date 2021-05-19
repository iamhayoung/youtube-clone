import express from "express";
import { upload, see, edit, deleteVideo } from "../controllers/videoController";

const videoRouter = express.Router();

// :id는 parameter라고 함. 파라미터는 url안에 변수를 넣는것을 허용해줌
// :을 사용하는건 express에게 이게 변수라는 것을 알려주기 위해서임
// express가 req Object에 parameter값을 보내줌
// console.log(req.params)으로 실제 id 번호를 확인할 수 있음
// parameter를 안쓰는 라우터(/upload)를 가장 위에 올려야함
// parameter를 사용하는 라우터(/:id)의 밑에 /upload를 두면,
// express가 upload라는 글자를 id 파라메터로 인식해버리기 때문
videoRouter.get("/upload", upload);
videoRouter.get("/:id", see);
videoRouter.get("/:id/edit", edit);
videoRouter.get("/:id/delete", deleteVideo);

export default videoRouter;
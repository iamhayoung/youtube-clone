import express from "express";
import morgan from "morgan";

const PORT = 4000;

const app = express();
const logger = morgan("dev"); // morgan은 request에 대한 http 상태 코드, 접속 하는데 걸린 시간, 명령어 등 log 자료들을 콘솔에 기록해준다. morgan("dev")를 호출하면 request, response, next를 포함한 middleware를 return 해줌
app.use(logger); // logger()는 middleware를 return해줌

// router는 controller와 URL의 관리를 쉽게 해준다.
// router는 작업중인 주제를 기반으로 URL을 그룹화해준다
// 미들웨어와 라우팅 기능만 수행할 수 있는 mini application과 같다.
// express.Router()는 라우터를 만들게 해줌
const globalRouter = express.Router();

const handleHome = (req, res) => res.send("Home");

globalRouter.get("/", handleHome);

const userRouter = express.Router();

const handleEditUser = (req, res) => res.send("Edit user");

userRouter.get("/edit", handleEditUser);

const videoRouter = express.Router();

const handleWatchVideo = (req, res) => res.send("Watch video")

videoRouter.get("/watch", handleWatchVideo);

// Router가 express에게 누군가 root url(use의 첫번쨰 인자)에 접근하면 express는 2번째인자(globalRouter).get의 안으로 들어감
app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

const handleListening = () =>
  console.log(`✅ Server listening on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);
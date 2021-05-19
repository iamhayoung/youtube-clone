import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";

const PORT = 4000;

console.log(process.cwd())

const app = express();
const logger = morgan("dev"); // morgan은 request에 대한 http 상태 코드, 접속 하는데 걸린 시간, 명령어 등 log 자료들을 콘솔에 기록해준다. morgan("dev")를 호출하면 request, response, next를 포함한 middleware를 return 해줌

// Express에게 이제부터 사용할 view engine은 pug라고 알려줌. 뷰엔진을 pug로 세팅하는것임
// 이렇게 세팅하면 Express는 html을 리턴하기 위해 pug를 사용함
app.set("view engine", "pug");
app.use(logger); // logger()는 middleware를 return해줌
// Router가 express에게 유저가 root url(use의 첫번쨰 인자)로 시작하는 url에 접근하면
// Router는 url을 그룹화하는 방법.
// express는 2번째인자(globalRouter).get의 안으로 들어감
app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

const handleListening = () =>
  console.log(`✅ Server listening on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);
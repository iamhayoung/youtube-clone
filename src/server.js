import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";

const PORT = 4000;

const app = express();
const logger = morgan("dev"); // morgan은 request에 대한 http 상태 코드, 접속 하는데 걸린 시간, 명령어 등 log 자료들을 콘솔에 기록해준다. morgan("dev")를 호출하면 request, response, next를 포함한 middleware를 return 해줌

// Express에게 이제부터 사용할 view engine은 pug라고 알려줌. 뷰엔진을 pug로 세팅하는것임
// 이렇게 세팅하면 Express는 html을 리턴하기 위해 pug를 사용함
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views"); // Express views의 기본 디렉토리(current working directory)를 /src/views/로 수정
app.use(logger); // logger()는 middleware를 return해줌
// urlencoded({ extended: true }): form 데이터를 javascript로 통역해주는 middleware. Express가 form의 value를 이해할 수 있도록 하고 그 값을 자바스크립트 object형식으로 변형시켜줌(POST request일때만! req.body에 form의 value값을 담아줌)
app.use(express.urlencoded({ extended: true })); // middleware이기 때문에, Router들보다 먼저 실행되게 위에 둬야함!!
// Router가 express에게 유저가 root url(use의 첫번쨰 인자)로 시작하는 url에 접근하면
// Router는 url을 그룹화하는 방법.
// express는 2번째인자(globalRouter).get의 안으로 들어감
app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

const handleListening = () =>
  console.log(`✅ Server listening on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);
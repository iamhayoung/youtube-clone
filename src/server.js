import express from "express";
import morgan from "morgan";

const PORT = 4000;

const app = express();
const logger = morgan("dev"); // morgan은 request에 대한 http 상태 코드, 접속 하는데 걸린 시간, 명령어 등 log 자료들을 콘솔에 기록해준다. morgan("dev")를 호출하면 request, response, next를 포함한 middleware를 return 해줌


const handleHome = (req, res) => {
  console.log("I will respond")
  return res.send("hello");
};

const handleLogin = (req, res) => {
  return res.send("login");
}

// logger()는 middleware를 return해줌
app.use(logger);

app.get("/", handleHome);
app.get("/login", handleLogin);

const handleListening = () =>
  console.log(`✅ Server listening on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);
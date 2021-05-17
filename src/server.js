import express from "express";

const PORT = 4000;

// app이라는 이름의 express 앱 생성
// express function을 사용하면 express application을 생성해줌
const app = express();

// Route handler는 자동으로 Express로부터 request object, response object를 받음.
// req, res 둘다 받음. (req)나 (res)처럼 하나만 받는건 안됨.
// addEventListener의 콜백함수가 자동으로 event를 갖는것처럼. 법칙임.
// request는 브라우저가 뭔가를 요청한다는거고, 쿠키나 method, URL같은 정보를 얻을 수 있다.
const handleHome = (req, res) => {
  // 브라우저가 request(root("/")페이지를 가져달라는)를 보내면, 서버는 응답을 해야한다. 응답해주는건 필수임
  // 응답해주지 않으면 브라우저는 계속 기다리기만 함(loading). 심지어 포기하기도 함(그래서 브라우저에 응답이 없습니다라는 까만 화면이 뜸)
  // request를 받았으면 response를 return해야지.
  // I still love you.라는 글자를 response로써 send보냄
  return res.send("<h1>I still love you.</h1>");
};

const handleLogin = (req, res) => {
  return res.send({ message: "Login here."});
};

// get method의 뜻: 저 페이지를 갖다줘(Get me that page) 할때의 get
// get request: 뭔가("/", "/login", "/profile" 등등...)를 '가져달라'는 request
// get request에는 route가 있다. route는 목적지임. 어디로 가는지, 어디로 가려하는지.
// 브라우저가 우리 서버에게 root("/")페이지의 URL이 필요하다고 get request를 보냄
// 브라우저가 get request를 보내면 get의 두번째 인자인 콜백함수를 실행
app.get("/", handleHome); // Route. Route란 handler로 URL을 정돈하는 것
app.get("/login", handleLogin); // Route

const handleListening = () =>
  console.log(`✅ Server listening on port http://localhost:${PORT} 🚀`);

// 서버는 24시간 내내 온라인에 연결된 컴퓨터이다.
// 서버는 request를 listening하고 있다. request를 듣고 답하는 것이다.
// request는 브라우저(유저)가 뭔가를 요청하거나, 보내거나, 어떤 행동을 하는 것.
// request는 서버와 상호작용 하는 모든 일(페이지 접속, 카톡 메시지 전송, 유튜브 접속, 영상 클릭, 재생 클릭 등...)을 말한다. 서버는 그걸 listen하는 거임.
// 서버는 유저의 행동을 24시간 listening하고 있다. 기다리고 있다.
// 서버가 유저들이 뭔가를 요청할 때까지 기다리게 해야한다. 그래서 listen()을 사용함
// listen의 첫번째 인자: port. port는 컴퓨터의 문이나 창문과 같은 것. 서버에게 어떤 port를 listening할 지 알려줘야함.
// listen의 두번째 인자: 콜백함수. 서버가 시작될 때 작동하는 함수.
app.listen(PORT, handleListening);
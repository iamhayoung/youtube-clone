import express from "express";

const PORT = 4000;

// app이라는 이름의 express 앱 생성
// express로 app이라는 이름의 서버를 만든것임
// express function을 사용하면 express application을 생성해줌
const app = express();

// middleware는 request, response, next가 필요함
// middleware함수에서 next()함수를 호출한다면, 그 함수는 middleware라는걸 의미한다
// middleware는 request에 응답하지 않는다. request를 지속시켜준다.
// middleware는 작업을 다음 함수에게 넘기는 함수이다. 응답하는 함수가 아니다.
// 이 middleware는 사람들이 우리 웹사이트의 어디를 가려는지 말해줄것이다
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next(); // middleware가 next()를 호출하면 express가 get()의 세번째인자인 함수를 호출해줌
};

const privateMiddleware = (req, res, next) => {
  // req object로부터 url 정보를 받아서
  const url = req.url;
  if (url === "/protected") {
    // url이 /protected와 같을때
    // middleware가 뭔가를 return하면 middleware가 거기서 response를 중단시켜서 종료되게 됨.
    // 중간에 개입해서 next()를 호출하는 것을 막음
    return res.send("<h1>Not Allowed</h1>")
  }
  console.log("Allowed, you may continue.")
  next(); // url이 /protected가 아니라면 next()함수 호출
};

// 모든 Route handler=controller는 자동으로 Express로부터 request object, response object, next() argument를 받음.
// req, res 반드시 둘다 같이 받아야함. (req)나 (res)처럼 하나만 받는건 안됨. next는 필수아님
// addEventListener의 콜백함수가 자동으로 event를 갖는것처럼. 법칙임.
// next() argument는 다음 함수를 호출해준다.
// request는 브라우저가 뭔가를 요청한다는거고, 쿠키나 method, URL같은 정보를 얻을 수 있다.
const handleHome = (req, res) => {
  // 브라우저가 request(root("/")페이지를 가져달라는)를 보내면, 서버는 응답을 해야한다. 응답해주는건 필수임
  // 응답해주지 않으면 브라우저는 계속 기다리기만 함(loading). 심지어 포기하기도 함(그래서 브라우저에 응답이 없습니다라는 까만 화면이 뜸)
  // request를 받았으면 response를 return해야지.
  // I still love you.라는 글자를 response로써 send보냄
  return res.send("I love middlewares");
};

const handleProtected = (req, res) => {
  return res.send("Welcome to the private lounge")
}

// use()는 global middleware를 만들수있게 해준다. 어느 route(URL)에서도 작동하는 middleware.
// 실행순서가 중요함. express는 모든걸 js처럼 위에서 아래순으로 실행시킴.
// middleware를 use하는게 먼저오고, 그다음에 get()이 와야함
// 모든 route에서 use(함수)를 사용할수있게됨
// middleware를 use()를 이용하여 위에다 두면 모든 route에서 적용됨
app.use(logger);
app.use(privateMiddleware);

// get method의 뜻: 저 페이지를 갖다줘(Get me that page) 할때의 get
// 브라우저에게 누군가 홈페이지를 get하려고 할때 어떻게 반응할지 알려주는것
// get request: 뭔가("/", "/login", "/profile" 등등...)를 '가져달라'는 request
// get request에는 route가 있다. route는 목적지임. 어디로 가는지, 어디로 가려하는지.
// URL=routes을 통해서 request를 전달하는것임
// 브라우저가 우리 서버에게 root("/")페이지의 URL이 필요하다고 get request를 보냄
// 그럼 express가 두번쨰 인자인 middleware 함수를 호출 (생략가능)
// 브라우저가 get request를 보내면 get의 세번째 인자인 콜백함수인 handler=controller를 실행
// middleware: middle software. 중간에 있는 소프트웨어. middleware는 브라우저가 request한 다음, 서버가 response하기 전. 그 사이에 middleware가 있다
// middleware는 request에 응답하지 않는다. request를 지속시켜준다.
// 모든 middleware는 handler=controller고, 모든 handler=controller는 middleware이다.
// 즉 모든 controller는 middleware가 될 수 있다. middleware함수에서 next()함수를 호출한다면, 그 함수는 middleware라는걸 의미한다
// get의 세번째인자함수는 middleware실행 뒤에 실행되는 finalware이다
app.get("/", handleHome); // Route. Route란 handler=controller로 URL을 정돈하는 것
app.get("/protected", handleProtected);

const handleListening = () =>
  console.log(`✅ Server listening on port http://localhost:${PORT} 🚀`);

// 서버는 24시간 내내 온라인에 연결된 컴퓨터이다.
// 서버는 request를 listening하고 있다. request를 듣고 답하는 것이다.
// request는 브라우저(유저)가 뭔가를 요청하거나, 보내거나, 어떤 행동을 하는 것.
// request는 서버와 상호작용 하는 모든 일(페이지 접속, 카톡 메시지 전송, 유튜브 접속, 영상 클릭, 재생 클릭 등...)을 말한다. 서버는 그걸 listen하는 거임.
// 서버는 유저의 행동을 24시간 listening하고 있다. 기다리고 있다.
// 서버가 유저들이 뭔가를 요청할 때까지 기다리게 해야한다. 그래서 listen()을 사용함
// listen의 첫번째 인자: port. port는 컴퓨터의 문이나 창문과 같은 것. 서버에게 어떤 port를 listening할 지 알려줘야함.
// app이라는 서버는 4000번 포트만 listening하고 있다는 뜻.
// 서버는 내 컴퓨터 전체를 listening할 수 없다. port가 있어야함. 컴퓨터에는 많은 port들이 있는데 다수가 개방되어 있고 많은 프로그램들이 그 안에서 소통하고 있다. 브라우저가 request를 보낼때 해당 port로 request를 보내는것이다
// listen의 두번째 인자: 콜백함수. 서버가 시작될 때 작동하는 함수.
app.listen(PORT, handleListening);
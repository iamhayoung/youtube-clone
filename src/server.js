import express from "express";

const PORT = 4000;

// app이라는 이름의 express 앱 생성
// express function을 사용하면 express application을 생성해줌
const app = express();

const handleListening = () =>
  console.log(`✅ Server listening on port http://localhost:${PORT} 🚀`);

// 서버는 24시간 내내 온라인에 연결된 컴퓨터이다.
// 서버는 request를 listening하고 있다. request를 듣고 답하는 것이다.
// request는 서버와 상호작용 하는 모든 일(페이지 접속, 카톡 메시지 전송, 유튜브 접속, 영상 클릭, 재생 클릭 등...)을 말한다. 서버는 그걸 listen하는 거임.
// 서버는 유저의 행동을 24시간 listening하고 있다. 기다리고 있다.
// 서버가 유저들이 뭔가를 요청할 때까지 기다리게 해야한다.
// listen의 첫번째 인자: port. port는 컴퓨터의 문이나 창문과 같은 것. 서버에게 어떤 port를 listening할 지 알려줘야함.
// listen의 두번째 인자: 콜백함수. 서버가 시작될 때 작동하는 함수.
app.listen(PORT, handleListening);
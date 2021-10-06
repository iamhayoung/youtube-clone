import express from 'express';
import morgan from 'morgan';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import rootRouter from './routers/rootRouter';
import videoRouter from './routers/videoRouter';
import userRouter from './routers/userRouter';
import { localsMiddleware } from './middlewares';

const app = express();
const logger = morgan('dev'); // morgan은 request에 대한 http 상태 코드, 접속 하는데 걸린 시간, 명령어 등 log 자료들을 콘솔에 기록해준다. morgan("dev")를 호출하면 request, response, next를 포함한 middleware를 return 해줌

// Express에게 이제부터 사용할 view engine은 pug라고 알려줌. 뷰엔진을 pug로 세팅하는것임
// 이렇게 세팅하면 Express는 html을 리턴하기 위해 pug를 사용함
app.set('view engine', 'pug');
app.set('views', process.cwd() + '/src/views'); // Express views의 기본 디렉토리(current working directory)를 /src/views/로 수정
app.use(logger); // logger()는 middleware를 return해줌
// urlencoded({ extended: true }): form 데이터를 javascript로 통역해주는 middleware. Express가 form의 value를 이해할 수 있도록 하고 그 값을 자바스크립트 object형식으로 변형시켜줌(POST request일때만! req.body에 form의 value값을 담아줌)
app.use(express.urlencoded({ extended: true })); // middleware이기 때문에, Router들보다 먼저 실행되게 위에 둬야함!!
// Router가 express에게 유저가 root url(use의 첫번쨰 인자)로 시작하는 url에 접근하면
// Router는 url을 그룹화하는 방법.
// express는 2번째인자(rootRouter).get의 안으로 들어감

// 세션: 백엔드와 브라우저 간에 어떤 활동을 했는지 기억하는 것. 브라우저와 백엔드 사이의 memory, history 같은것
// 예를 들어 노마드 코더에 로그인이 되어있다면 현재 사용하고 있는 브라우저와 니코가 만든 백엔드 사이에 세션이 존재하는 것임.
// 하지만 2주 정도 후에는 이 세션이 사라질것임. 그러면 다시 로그인을 해야함
// 세션이 작동하려면 백엔드와 브라우저가 서로에 대한 정보를 가지고 있어야함.
// 왜냐면 로그인 페이지에서 HTTP 요청을 하면, 요청이 처리되고 끝나게 되는데 그이후로는 백엔드가 아무것도 할수가 없다!
// 백엔드와 브라우저 모두 아무것도 하지 못함. 예를 들어, Home 화면으로 이동하면 GET 요청을 보내게 되는데, 백엔드가 HTML을 render하고 나면 연결이 그대로 끝나버림. 연결이 계속 유지되지 않음. 계속 연결이 유지되어 있는 WIFI랑은 다름.
// 요청을 받고, 처리를 끝내면 서버에서는 누가 요청을 보냈는지 잊어버리게 되고 브라우저도 마찬가지로 잊어버리게 됨. 서버가 더이상 필요없으니까.
// 이러한 것을 stateless(무상태)라고 함! 한번 연결되었다가 끝나는 것임. 이 둘 사이 연결에 state가 없는 것임. 한번 연결하고 끝나는것임
// 그래서 우리는 유저에게 어떠한 정보를 남겨줘야함. 유저가 백엔드에 뭔가 요청할 때마다 누가 요청하는지 알 수 있도록.
// 그래서 유저가 로그인할때마다 유저에게 뭔가 줄거임. 조그만한 텍스트 같은것을 줄거임. 이게 너의 텍스트니까 잘 가지고 있으라고 알려주고
// 유저가 우리한테 요청을 보낼때마다, 그 텍스트를 같이 보내달라고 할거임. 그러면 백엔드는 유저가 누군지 알게 되고 그 유저의 정보를 제공하게됨
// 중요한것은 유저가 로그인할 때 유저에게 어떠한 텍스트를 준다는 것!

// express-session: 미들웨어. express에서 세션을 처리할수 있게 해줌.
// 이 미들웨어가 브라우저에 cookie를 전송함.
// 쿠키와 세션은 별개의 것임. cookie는 백엔드가 유저의 브라우저에게 주는 정보. 단지 정보를 주고 받는 수단일 뿐.
// 브라우저에서 매번 백엔드로 request를 보낼때마다 cookie가 request랑 같이 전송됨
// cookie에는 숫자, 이름 등 다양한 정보를 넣을 수 있음. 우리는 쿠키에 session ID를 넣을 것임. 브라우저와 백엔드와의 연결이 평생 보장되지 않기 때문.
//이 미들웨어가 사이트로 들어오는 모든 유저에게 자동으로 세션 아이디를 부여해서 기억하게 함. 브라우저는 쿠키에 그 세션 아이디를 저장하고, express에서도 그 세션을 세션 DB(object)에 저장함
// 로그인하지 않았어도 기억하게 함! 들어온 사람(브라우저)에게 어떤 텍스트를 보내고, 그 텍스트를 가지고 유저가 누구인지 알아낼거임.
// 그래서 서버가 브라우저를 개별적으로 기억할 수 있게 함
// 그 텍스트는 브라우저 개발자도구-application-cookies-connect.sid에서 볼수있음. 즉 백엔드의 메모리에 세션을 저장할수있는 db가 생긴거임
// 브라우저를 새로고침할때마다, 백엔드에 요청을 보낼때마다 브라우저 개발자도구-application-cookies-connect.sid의 값이 백엔드로 함께 보내질거임
// 브라우저가 알아서 백엔드로 쿠키를 보내도록 되어있음
// 서버를 재시작하면, 세션이 사라지게됨. express가 세션을 메모리에 저장하고 있기 때문. 그래서 서버를 재시작할때마다 세션이 사라짐
// 백엔드가 세션을 잊지않도록 세션을 몽고디비와 연결할거임
// 즉 세션과 세션 ID는 브라우저를 기억하는 방식 중 하나임. 브라우저와 백엔드 사이에는 와이파이처럼 유지되는 연결이 없으니까 백엔드에 요청을 보낼때마다 이 ID를 같이 보내줘야함. 그러면 백엔드가 ID를 기억할 수 있음.
// 그리고 이 세션 ID를 가지고 있으면 세션 object=일종의 세션 DB에 정보를 추가할 수 있음(아래 sessionstore 미들웨어)
// 그래서 DB에 이 세션을 위한 정보를 넣을 수 있음.
app.use(
  session({
    secret: process.env.COOKIE_SECRET, // secret: 우리가 쿠키에 sign할때 사용하는 string. 이 string을 가지고 쿠키를 sign하고 우리가 만든 것임을 증명할 수 있다.
    resave: false, // 모든 request마다 기존에 있던 session에 아무런 변경사항이 없을 시에도 그 session을 다시 저장하는 옵션
    saveUninitialized: false, // uninitialized: request가 들어오면 해당 request에서 새로 생성된 session에 아무런 작업이 이루어지지 않은 상황. saveUninitialized는 uninitialized 상태의 session을 강제로 저장함. 따라서 아무 내용 없는 session이 계속해서 저장될 수 있습니다. 그래서 false로 두어서 로그인했을떄(세션 초기화될때) 세션을 저장시킴
    // connect-mongo.MongoStore: 세션을 서버가 아닌 몽고디비에 저장. 서버는 재시작할때마다 메모리가 지워지기 때문에 로그인했던 사용자를 기억할 수 없음. 따라서 세션을 database에 저장시켜서 누구가 로그인 되어있어도 상태를 잊어버리지 않음.
    store: MongoStore.create({
      mongoUrl: process.env.DB_URL,
    }),
  })
);

// 쿠키
// secret: 우리가 쿠키에 sign할때 사용하는 string. 이 string을 가지고 쿠키를 sign하고 우리가 만든 것임을 증명할 수 있다.
// domain: 이 쿠키를 만든 백엔드가 누구인지 알려줌. 브라우저는 domain에 따라 쿠키를 저장하도록 되어있음. 그리고 쿠키는 domain에 있는 백엔드로만 전송됨
// Expires: 값이 session일 경우는 쿠키의 만료날짜가 명시되지 않은것. 만료날짜를 지정하지 않으면 session cookie로 설정되고 사용자가 닫으면 session cookie는 사라지게됨
// Max-age: 말그대로 언제 세션이 만료되는지 알려줌. 이 시간이 지나면 쿠키가 사라짐. 로그아웃됨

// app.use((req, res, next) => {
//   // 헤더안에 쿠키가 있음. 브라우저를 새로고침할때마다(요청을 보낼때마다) 백엔드에서 쿠키를 받게됨
//   console.log(req.headers);
//   next();
// });

// app.use((req, res, next) => {
//   req.sessionStore.all((error, sessions) => {
//     // 백엔드가 기억하고 있는 sessions(=유저)와 세션(유저)의 모든 ID를 콘솔로그함!
//     console.log(sessions);
//     next();
//   });
// });

app.get('/add-one', (req, res, next) => {
  req.session.potato += 1;
  return res.send(`${req.session.id}\n${req.session.potato}`);
});

app.use(localsMiddleware);
app.use('/uploads', express.static('uploads')); // uploads 폴더를 노출시킴
app.use('/', rootRouter);
app.use('/videos', videoRouter);
app.use('/users', userRouter);

export default app;

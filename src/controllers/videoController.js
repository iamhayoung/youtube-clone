import Video from "../models/Video";

// template(base.pug)을 렌더링하는 것은 Controller임.
// render의 첫번째 인자는 렌더링할 파일의 이름
// 두번째 인자는 pug template(base.pug)에 보낼 변수임. object 형태로 보내줘야함
// 각페이지의 views/base.pug의 pageTitle이라는 값에 들어갈 값을 넣어줌
// callback: 특정 코드를 마지막에 실행하게 함. 무언가 발생하고 난 다음 호출되는 function. JS에서 기다림을 표현하는 하나의 방법. 무언가가 발생한다음 어떤것을 한다. 어떤것들은 실행과 동시에 적용되지 않기 때문. callback을 사용하면 아무것도 return되지 않아야함
// Video(model)은 데이터가 완전히 전송될때까지 기다려야함. database 검색이 안끝났을때 render되는것을 방지하기 위해서. 데이터베이스가 종료되거나 바쁘거나, 디비의 전송 속도가 느릴수도 있다. 다양한 상황에 따라 데이터 처리에 시간이 걸릴수도 있다. 우리가 받는 데이터는 자바스크립트 파일속에 없고 외부인 데이터베이스에 있기 때문. 데이터베이스는 자바스크립트 밖에 존재하기 때문. 코드 실행중 오류가 발생할 가능성도 있다. 그래서 기다려야함.
// 기다리게 하기위해서 사용하는것 1. callback 2. promise
// find의 두번째 인자: 콜백함수. (error, videos)는 정해져있는 형태임. videos는 Video model의 데이터.
// 두번째 인자 콜백함수안에 render를 넣어줌으로써, database 검색이 안끝났을때 render되는것을 방지함. database 검색이 끝나야 rendering이 시작됨
/*
callback에서는 start, finished 다음에 videos를 출력함
console.log("start")
Video.find({}, (error, videos) => {
  if (error) {
    return res.render("server-error")
  }
  return res.render("home", { pageTitle: "Home", videos });
});
console.log("finished")
*/
export const home = async (req, res) => {
  // await는 async function 안에서만 사용가능
  try {
    // find는 mongoose 구문
    // find의 첫번째 인자: search term. search term이 비어있으면 모든 형식을 찾는다는것을 뜻함
    // await가 기재된 코드의 행(line)은 javascript가 database로부터 결과값을 받을때 기다려줌
    // await를 find앞에 적으면 find는 내가 callback이 필요하지않다는걸 알게됨. 그래서 find는 find operation의 결과값으로 찾아낸 비디오를 바로 출력해줌. async await를 사용할때는 콜백함수 필요없음
    // promise에서는 순서대로 위에서 아래로 코드가 실행됨
    // 에러를 출력하기 위해 try catch문을 사용
    const videos = await Video.find({});
    return res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    // 에러 발생시(database가 꺼졌거나, 연결이 끊겼거나, 사람이 포화상태거나 등) catch로 넘어가서 실행
    return res.render("server-error");
  }
}; // views/home.pug

export const watch = (req, res) => {
  const { id } = req.params;
  return res.render("watch", { pageTitle: `Watching` });
}; // views/watch.pug

// getEdit: form을 화면에 렌더링해주는 역할
export const getEdit = (req, res) => {
  const { id } = req.params;
  return res.render("edit", { pageTitle: `Editing` })
}; // views/edit.pug

// postEdit: 비디오에 대한 변경사항을 저장해주는 역할
export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body; // title은 postEdit의 input의 name임. input에 name값 안넣어주면 req.body에 값이 안잡힘
  return res.redirect(`/videos/${id}`); // post로 submit하면 watch페이지로 리다이렉트
}; // views/edit.pug

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video"});
}; // views/upload.pug

export const postUpload = (req, res) => {
  // here we will add a video to the videos array
  const { title } = req.body;
  return res.redirect("/");
}; // views/upload.pug
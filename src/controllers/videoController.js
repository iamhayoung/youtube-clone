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
  // find는 mongoose 구문. 모든 비디오를 database에서 불러오는것
  // find의 첫번째 인자: search term. search term이 비어있으면 모든 형식을 찾는다는것을 뜻함
  // await가 기재된 코드의 행(line)은 javascript가 database로부터 결과값을 받을때 기다려줌
  // await를 find앞에 적으면 find는 내가 callback이 필요하지않다는걸 알게됨. 그래서 find는 find operation의 결과값으로 찾아낸 비디오를 바로 출력해줌. async await를 사용할때는 콜백함수 필요없음
  // promise에서는 순서대로 위에서 아래로 코드가 실행됨
  // 에러를 출력하기 위해 try catch문을 사용
  const videos = await Video.find({}); // database에 저장된 video 정보
  return res.render("home", { pageTitle: "Home", videos });
}; // views/home.pug

export const watch = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id); // findByID(): id로 video 데이터값을 찾게 해줌
  if (!video) {
    // 에러가 날 경우 if를 써서 먼저 처리함. 에러체크를 먼저 함으로써 나머지 코드는 에러걱정할 필요없음
    // 에러처리 if문 안에서는 반드시 return써줘야함. 그래야 함수가 그대로 종료됨
    return res.render("404", { pageTitle: "Video not found." });
  }
  // if 바깥의 코드는 정상적인 경우 실행될것들로 코딩
  return res.render("watch", { pageTitle: video.title, video });
}; // views/watch.pug

// getEdit: form을 화면에 렌더링해주는 역할
export const getEdit = async (req, res) => {
  const { id } = req.params;
  // exists를 못씃고 findById를 써야하는 이유는 video object를 edit template로 보내줘야 하기때문
  const video = await Video.findById(id);
  if (!video) {
    return res.render("404", { pageTitle: "Video not found." });
  }
  return res.render("edit", { pageTitle: `Edit: ${video.title}`, video })
}; // views/edit.pug

// postEdit: 비디오에 대한 변경사항을 저장해주는 역할
export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body; // title은 postEdit의 input의 name임. input에 name값 안넣어주면 req.body에 값이 안잡힘
  // exists는 인수로 filter(조건)를 받음. exists는 true/false를 리턴함. object의 id가 req.params.id와 같은 경우를 찾음
  // findById를 안써도 되는 이유는 video object를 template로 안보내줘도 되기때문
  const video = await Video.exists({ _id: id });
  if (!video) {
    return res.render("404", { pageTitle: "Video not found." });
  }
  /*
  const video = await Video.findById(id);
  video.title = title;
  video.description = description;
  video.hashtags = hashtags
    .split(",")
    .map(word => word.startsWith("#") ? word : `#${word}`);
  await video.save(); // 변경된 사항들을 저장
  */

  // findByIdAndUpdate는 위의 코드를 줄여줌. 첫번째 인수: 업데이트하고자하는 영상의 ID
  // 두번째 인수: 업데이트할 정보 혹은 내용
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: hashtags
      .split(",")
      .map(word => word.startsWith("#") ? word : `#${word}`),
  });
  return res.redirect(`/videos/${id}`); // post로 submit하면 watch페이지로 리다이렉트
}; // views/edit.pug

// videos/upload페이지 첫실행, postUpload에서 업로드 에러없을때 실행
export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
}; // views/upload.pug

export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;
  /*
  // document는 현재 schema와 같은모양으로 만듦. document는 실제 데이터를 담음. 이 document를 database에 저장해야함
  // document는 Javascript object. 데이터 검증하는것을 도와줌. 올바르지않은 데이터가 저장되지않도록 schema에서 설정된 type과 다른 데이터가 담기면 그 keyごと 사라지고 저장안되게함
  const video = new Video({
    title,
    description,
    hashtags: hashtags.split(",").map(word => `#${word}`),
  })
  await video.save();
  // save: document를 database에 넘겨줌. save는 promise를 return해줌. promise는 JS에서 코드를 기다리게함. 즉, database에 기록되고 저장되는데까지 시간이 걸리기 때문에 promise를 리턴함으로써 save작업이 끝날때까지 기다려줘야한다. 그래서 postUpload함수에 async추가, save에 await추가해줌. save는 promise를 return하고 이걸 await하면 document가 return됨
  await video.save(); // video object를 database에 저장
  */
  // create()는 Javascript object를 만들어주는 과정과 save()를 합쳐서 해줌
  try {
    await Video.create({
      title,
      description,
      hashtags: hashtags
        .split(",")
        .map(word => word.startsWith("#") ? word : `#${word}`),
    });
    return res.redirect("/");
  } catch (error) {
    // catch를 통해 에러를 잡아내도 뭔가를 return해줘야함
    // error메시지를 upload template로 보내서 에러나면 에러메시지와 함께 upload페이지 렌더링
    return res.render("upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message
    });
  }
}; // views/upload.pug
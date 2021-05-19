let videos = [
  {
    title: "First Video",
    rating: 5,
    comments: 2,
    createdAt: "2 minutes ago",
    views: 1,
    id: 1
  },
  {
    title: "Second Video",
    rating: 5,
    comments: 2,
    createdAt: "2 minutes ago",
    views: 59,
    id: 2
  },
  {
    title: "Third Video",
    rating: 5,
    comments: 2,
    createdAt: "2 minutes ago",
    views: 59,
    id: 3
  },
];

// template(base.pug)을 렌더링하는 것은 Controller임.
// render의 첫번째 인자는 렌더링할 파일의 이름
// 두번째 인자는 pug template(base.pug)에 보낼 변수임. object 형태로 보내줘야함
// 각페이지의 views/base.pug의 pageTitle이라는 값에 들어갈 값을 넣어줌
export const trending = (req, res) => {
  return res.render("home", { pageTitle: "Home", videos });
}; // views/home.pug

export const watch = (req, res) => {
  const { id } = req.params;
  const video = videos[id - 1]; // 현재 페이지의 videos 배열 정보
  return res.render("watch", { pageTitle: `Watching: ${video.title}`, video });
}; // views/watch.pug

// getEdit: form을 화면에 렌더링해주는 역할
export const getEdit = (req, res) => {
  const { id } = req.params;
  const video = videos[id - 1];
  return res.render("edit", { pageTitle: `Editing: ${video.title}`, video })
}; // views/edit.pug

// postEdit: 비디오에 대한 변경사항을 저장해주는 역할
export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body; // title은 postEdit의 input의 name임. input에 name값 안넣어주면 req.body에 값이 안잡힘
  videos[id - 1].title = title;
  return res.redirect(`/videos/${id}`); // post로 submit하면 watch페이지로 리다이렉트
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video"});
};

export const postUpload = (req, res) => {
  // here we will add a video to the videos array
  return res.redirect("/");
};
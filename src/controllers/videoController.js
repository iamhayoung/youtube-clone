// template(base.pug)을 렌더링하는 것은 Controller임.
// render의 첫번째 인자는 렌더링할 파일의 이름
// 두번째 인자는 pug template(base.pug)에 보낼 변수임.
// 각페이지의 views/base.pug의 pageTitle이라는 값에 들어갈 값을 넣어줌
export const trending = (req, res) => res.render("home", { pageTitle: "Home", potato: "potatoooo" }); // views/home.pug
export const see = (req, res) => res.render("watch"); // views/watch.pug
export const edit = (req, res) => res.render("edit"); // views/edit.pug

export const search = (req, res) => res.send("Search");
export const upload = (req, res) => res.send("Upload");
export const deleteVideo = (req, res) => {
  return res.send("Delete video");
};
export const localsMiddleware = (req, res, next) => {
  // res.locals는 global 전역변수임. 어느 templates에서도 접근 가능
  // pug는 res.locals에 그냥 접근할 수 있음! 그래서 locals에 담긴 정보를 #{}로 사용할 수 있음
  // 이런 방식으로 templates와 data를 공유가능
  // res.render를 사용하지 않아도 그냥 locals object로 template에 변수를 전역적으로 보낼 수 있음
  // res.locals.sexy = 'you';
  res.locals.siteName = 'Youtube Clone';
  res.locals.loggedIn = Boolean(req.session.loggedIn); // 값이 false이거나 undefined일수도 있으니 Boolean을 사용해서 이 값이 true이거나 false인지 확인
  res.locals.loggedInUser = req.session.user;
  next();
};

export const protectorMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    return next();
  } else {
    return res.redirect('/login');
  }
};

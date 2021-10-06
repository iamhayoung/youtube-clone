import bcrypt from 'bcrypt';
import User from '../models/User';

export const getJoin = (req, res) => res.render('join', { pageTitle: 'Join' });
export const postJoin = async (req, res) => {
  const { email, username, password, password2, name, location } = req.body;
  const pageTitle = 'Join';

  if (password !== password2) {
    return res.status(400).render('join', {
      pageTitle,
      errorMessage: 'Password confirmation does not match.',
    });
  }

  // 몽고 $or operator: 각 조건이 true일 때 실행되게 만들 수 있음
  // 배열안에 조건을 적음.
  // 첫번째 조건: req.body.username과 일치하는 User를 찾음
  // 첫번째 조건: req.body.email 일치하는 User를 찾음
  const exists = await User.exists({
    $or: [{ username }, { email }],
  });
  if (exists) {
    return res.status(400).render('join', {
      pageTitle,
      errorMessage: 'This username/email is already taken.',
    });
  }

  // const emailExists = await User.exists({ username });
  // if (emailExists) {
  //   return res.render('join', {
  //     pageTitle,
  //     errorMessage: 'This email is already taken.',
  //   });
  // }

  try {
    await User.create({ email, username, password, name, location });
    return res.redirect('/login');
  } catch (error) {
    return res.status(400).render('join', {
      pageTitle: 'Join',
      errorMessage: error._message,
    });
  }
};

export const getLogin = (req, res) => {
  res.render('login', { pageTitle: 'Login' });
};

export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  const pageTitle = 'Login';

  // check if account exists
  if (!user) {
    return res.status(400).render('login', {
      pageTitle,
      errorMessage: 'An account with this username does not exists.',
    });
  }

  // check if password correct
  const ok = await bcrypt.compare(password, user.password);

  if (!ok) {
    return res.status(400).render('login', {
      pageTitle,
      errorMessage: 'Wrong password',
    });
  }

  // 로그인 성공시 세션 스토어(세션 오브젝트)에 정보 추가
  req.session.loggedIn = true; // 로그인 플래그
  req.session.user = user; // DB로부터 찾은 유저정보
  return res.redirect('/');
};

export const getEdit = (req, res) => {
  const { user } = req.session;
  return res.render('edit-profile', { pageTitle: 'Edit Profile', user });
};

export const postEdit = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    body: { avatar, name, email, username, location },
  } = req;
  const updatedUser = await User.findByIdAndUpdate(
    _id,
    {
      avatar,
      name,
      email,
      username,
      location,
    },
    { new: true }
  );
  req.session.user = updatedUser;

  return res.redirect('/users/edit');
};
export const remove = (req, res) => res.send('Remove');
export const logout = (req, res) => res.send('Log Out');
export const see = (req, res) => res.send('See');

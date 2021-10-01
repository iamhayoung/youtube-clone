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
export const edit = (req, res) => res.send('Edit');
export const remove = (req, res) => res.send('Remove');
export const login = (req, res) => res.send('Login');
export const logout = (req, res) => res.send('Log Out');
export const see = (req, res) => res.send('See');

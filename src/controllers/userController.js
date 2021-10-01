import User from '../models/User';

export const getJoin = (req, res) => res.render('join', { pageTitle: 'Join' });
export const postJoin = async (req, res) => {
  const { email, username, password, name, location } = req.body;

  try {
    await User.create({ email, username, password, name, location });
    return res.redirect('/login');
  } catch (error) {
    return res.render('404', {
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

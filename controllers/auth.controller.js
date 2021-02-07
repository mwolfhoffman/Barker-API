import njwt from 'njwt';
import authrepository from '../repositories/auth.repository';
const bcrypt = require('bcrypt');

const encodeToken = (tokenData) => {
  return njwt.create(tokenData, process.env.APP_SECRET).compact();
}

const decodeToken = (token) => {
  return njwt.verify(token, process.env.APP_SECRET).setExpiration(new Date().getTime() + 604800000).body; //1 week
}

export const authMiddleware = async (req, res, next) => {
  const token = req.header('Access-Token');
  if (!token) {
    return next();
  }

  try {
    const decoded = decodeToken(token);
    const { userId } = decoded;
    const user = await authrepository.getUserById(userId)
    if (user) {
      req.userId = userId;
    }
  } catch (e) {
    return next();
  }
  next();
};

export const authenticated = (req, res, next) => {
  if (req.userId) {
    return next();
  }

  res.status(401);
  res.json({ error: 'User not authenticated' });
}

const returnInvalidCredentials = (res) => {
  res.status(401);
  return res.json({ error: 'Invalid username or password' });

}

export const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await authrepository.getUserByUsername(username)

  if (!user) {
    returnInvalidCredentials(res)
  }

  bcrypt.compare(password, user.password, (err, result) => {
    if (result) {
      const accessToken = encodeToken({ userId: user.id });
      return res.json({ accessToken });
    } else {
      return returnInvalidCredentials(res);
    }
  });
}

export const getUserById = async (req, res) => {
  const userId = req.params.id;
  const user = await authrepository.getUserById(userId)

  if (!user) {
    return res.status(404).send({ Error: 'User was not found.' });
  } else {
    let userViewModel = {
      id: user.id,
      username: user.username,
      profilePic: user.profile_pic
    }
    return res.send({user:userViewModel});
  }
}
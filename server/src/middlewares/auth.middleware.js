import admin from '../config/firebase';
import User from '../model/user';

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    const decodedToken = await admin.auth().verifyIdToken(token);

    console.log(decodedToken);

    if (!decodedToken) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const user = await User.findOne({ uid: decodedToken.uid });

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = {
      uid: user.uid,
      id: user._id,
    };

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

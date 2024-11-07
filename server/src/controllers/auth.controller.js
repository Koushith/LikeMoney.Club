import admin from '../config/firebase';
import User from '../model/user';

export const signIn = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = await admin.auth().verifyIdToken(token);
    if (!decodedToken) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const user = await User.findOne({ uid: decodedToken.uid });

    if (!user) {
      const newUser = new User({
        uid: decodedToken.uid,
        email: decodedToken.email,
        username: decodedToken.displayName,
        email: decodedToken.email,
        profilePicture: decodedToken.photoURL,
        role: 'user',
      });

      await newUser.save();
    }
    res.status(200).json({ message: 'User signed in', user });
  } catch (error) {
    console.log(error);
  }
};

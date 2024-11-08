import User from '../model/user.js';
import admin from '../config/firebase.js';

export const signIn = async (req, res) => {
  console.log('signIn ----------- route hit');

  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = await admin.auth().verifyIdToken(token);
    console.log('decodedToken', decodedToken);
    if (!decodedToken) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const user = await User.findOne({ uid: decodedToken.uid });
    console.log('user', user);

    if (!user) {
      const newUser = new User({
        uid: decodedToken.uid,
        email: decodedToken.email,
        username: decodedToken.name,
        email: decodedToken.email,
        profilePicture: decodedToken.picture,
        role: 'user',
      });

      await newUser.save();
      res.status(200).json({ message: 'user created', user: newUser });
    }
    res.status(200).json({ message: 'user signed in', user });
  } catch (error) {
    console.log(error);
  }
};

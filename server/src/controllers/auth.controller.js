import User from '../model/user.js';
import admin from '../config/firebase.js';

export const signIn = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = await admin.auth().verifyIdToken(token);
    if (!decodedToken) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    let user = await User.findOne({ uid: decodedToken.uid });
    console.log('user-------------', user);

    if (!user) {
      const newUser = new User({
        uid: decodedToken.uid,
        email: decodedToken.email,
        username: decodedToken.name,
        profilePicture: decodedToken.picture,
        role: 'user',
      });

      user = await newUser.save();
      return res.status(201).json({ message: 'User created', user });
    }

    return res.status(200).json({ message: 'User signed in', user });
  } catch (error) {
    console.error('Sign in error:', error);
    if (error.code === 'auth/invalid-token') {
      return res.status(401).json({ message: 'Invalid authentication token' });
    }
    return res.status(500).json({ message: 'Error signing in', error: error.message });
  }
};

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { auth } from '@/lib/firebase';
import { clearAuth, sesetError, tAuthData, setUser, setAuthData, setError, setLoading } from '@/redux/slices/authSlice';
import { browserLocalPersistence, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { useSignInMutation } from '@/services/auth.service';
import { setPersistence } from 'firebase/auth';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const AuthScreen = () => {
  const navigate = useNavigate();
  const [signIn] = useSignInMutation();
  const dispatch = useDispatch();

  // const handleGoogleSignIn = async () => {
  //   // Logic for Google Sign-In goes here
  //   const user = await signInWithGoogle();
  //   console.log(user);
  //   if (user) {
  //     const response = await signIn(user?.accessToken as string).unwrap();
  //     console.log(response);
  //     dispatch(setUser(user as any));
  //     navigate('/');
  //   }
  // };

  const handleGoogleSignIn = async () => {
    dispatch(setLoading(true));

    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      console.log('result', result);
      const token = await result.user.getIdToken();

      const userInfo = {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
        token,
      };

      console.log('userInfo', userInfo);

      const response = await signIn(token).unwrap();
      console.log(' data', response);

      if ('user' in response) {
        dispatch(
          setAuthData({
            user: userInfo as any,
            accessToken: token,
          })
        );
        navigate('/');
      } else {
        throw new Error('Failed to login');
      }
    } catch (err) {
      console.error('Sign in error:', err);
      dispatch(setError(err instanceof Error ? err.message : 'An error occurred during sign in'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    // Set Firebase persistence
    setPersistence(auth, browserLocalPersistence);

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Get a fresh token on each auth state change
          const token = await firebaseUser.getIdToken(true); // Force refresh

          const userInfo = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            token,
          };

          dispatch(setUser(userInfo as any));

          const response = await signIn(token).unwrap();
          if ('user' in response) {
            dispatch(
              setAuthData({
                user: userInfo as any,
                accessToken: token,
              })
            );

            if (window.location.pathname === '/auth') {
              navigate('/');
            }
          } else {
            throw new Error('Failed to login');
          }
        } catch (err) {
          console.error('Auth error:', err);
          dispatch(setError(err instanceof Error ? err.message : 'Authentication error'));
          dispatch(clearAuth());
        }
      } else {
        // User is signed out
        dispatch(clearAuth());
      }
    });

    // Set up token refresh interval
    const tokenRefreshInterval = setInterval(async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        try {
          const newToken = await currentUser.getIdToken(true);
          dispatch(
            setAuthData({
              user: {
                uid: currentUser.uid,
                email: currentUser.email,
                displayName: currentUser.displayName,
                photoURL: currentUser.photoURL,
                accessToken: newToken,
              },
              accessToken: newToken,
            })
          );
        } catch (error) {
          console.error('Token refresh error:', error);
        }
      }
    }, 45 * 60 * 1000); // Refresh token every 45 minutes

    return () => {
      unsubscribe();
      clearInterval(tokenRefreshInterval);
    };
  }, [dispatch, signIn, navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Card className="w-96 shadow-lg">
        <CardHeader>
          <h1 className="text-2xl font-bold text-center">Welcome to the Auth Screen</h1>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <Button onClick={handleGoogleSignIn} className="mt-4">
            Sign in with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { signInWithGoogle } from '@/lib/auth';
import { setUser } from '@/redux/slices/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const AuthScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleGoogleSignIn = async () => {
    // Logic for Google Sign-In goes here
    const user = await signInWithGoogle();
    console.log(user);
    if (user) {
      dispatch(setUser(user as any));
      navigate('/');
    }
  };

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

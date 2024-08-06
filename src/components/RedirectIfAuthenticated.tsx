import { Navigate } from 'react-router-dom';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { ApplicationUser } from '../api/types';

const RedirectIfAuthenticated = ({ children }: { children: JSX.Element }) => {
  const currentUser = useAuthUser<ApplicationUser>();

  if (currentUser) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RedirectIfAuthenticated;
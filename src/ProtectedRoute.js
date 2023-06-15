import { Route, Navigate } from 'react-router-dom';
import AuthService from './views/auth-service'; // Ajuste o caminho se necessário

export default function ProtectedRoute({ children, ...rest }) {
  let currentUser = AuthService.getCurrentUser();
  
  return (
    <Route
      {...rest}
      render={({ location }) =>
        currentUser ? (
          children
        ) : (
          <Navigate
            to="/login"
            state={{ from: location }}
          />
        )
      }
    />
  );
}

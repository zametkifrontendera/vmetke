import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { AuthPage } from '../pages/AuthPage';
import { RoutesEnum } from '../shared/config/routes';
import { useAppStore } from './store';
import '../shared/lib/styles/globals.scss';

export default function App() {
  const { user } = useAppStore();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={RoutesEnum.HOME}
          element={user ? <HomePage /> : <Navigate to={RoutesEnum.AUTH} />}
        />
        <Route
          path={RoutesEnum.AUTH}
          element={!user ? <AuthPage /> : <Navigate to={RoutesEnum.HOME} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

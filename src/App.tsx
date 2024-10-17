import './index.css';
import './vars.css';
import { AppRoutes } from './routes';
import { useAuth } from './hooks/useAuth';

export function App() {
  useAuth();
  return <AppRoutes />;
}

import './App.css';
import Post from './post';
import Header from './header';
import { Route, Routes } from 'react-router-dom';
import Layout from './layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <Routes>
      <Route path={'/'} element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path={'/login'} element={<LoginPage />} />
        <Route path={'/register'} element={<RegisterPage />} />
      </Route>
    </Routes>
  );
}

export default App;

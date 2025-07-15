import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './pages/Auth';
import Todo from './pages/Todo';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem('token'));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/todos"
          element={token ? <Todo /> : <Navigate to="/auth" />}
        />
        <Route path="*" element={<Navigate to={token ? '/todos' : '/auth'} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

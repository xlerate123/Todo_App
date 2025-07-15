import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './pages/Auth';
import Todo from './pages/Todo';

function App() {
  const token = localStorage.getItem('token');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/todos" element={token ? <Todo /> : <Navigate to="/auth" />} />
        <Route path="*" element={<Navigate to={token ? '/todos' : '/auth'} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import WineList from './components/WineList';
import AddWineForm from './components/AddWineForm';
import EditWineForm from './components/EditWineForm';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  const handleLogin = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem('token', newToken); // Сохраняем токен в localStorage
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token'); // Удаляем токен из localStorage
  };

  return (
    <Router>
      <div>
        <h1>Virtual Wine Taster</h1>
        <nav>
          <Link to="/">Список вин</Link> | <Link to="/add-wine">Добавить новое вино</Link>
          {token ? (
            <>
              | <button onClick={handleLogout}>Выйти</button>
            </>
          ) : (
            <>
              | <Link to="/register">Регистрация</Link> | <Link to="/login">Вход</Link>
            </>
          )}
        </nav>
        <Routes>
          <Route path="/" element={<WineList />} />
          <Route path="/add-wine" element={token ? <AddWineForm /> : <LoginForm onLogin={handleLogin} />} />
          <Route path="/edit-wine/:id" element={token ? <EditWineForm /> : <LoginForm onLogin={handleLogin} />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
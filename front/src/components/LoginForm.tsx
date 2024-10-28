
import React, { useState } from 'react';
import axios from 'axios';

const LoginForm: React.FC<{ onLogin: (token: string) => void }> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/auth/login', { username, password });
      const { token } = response.data;
      onLogin(token); // Сохраняем токен в приложении
      alert('Вы успешно вошли!');
    } catch (error) {
      console.error('Ошибка при входе:', error);
      alert('Ошибка при входе');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Вход</h2>
      <label>
        Имя пользователя:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
      </label>
      <label>
        Пароль:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </label>
      <button type="submit">Войти</button>
    </form>
  );
};

export default LoginForm;
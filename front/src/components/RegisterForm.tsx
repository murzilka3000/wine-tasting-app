// frontend/src/components/RegisterForm.tsx
import React, { useState } from 'react';
import axios from 'axios';

const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5001/api/auth/register', { username, password });
      alert('Регистрация успешна! Теперь вы можете войти в систему.');
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
      alert('Ошибка при регистрации');
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Регистрация</h2>
      <label>
        Имя пользователя:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
      </label>
      <label>
        Пароль:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </label>
      <button type="submit">Зарегистрироваться</button>
    </form>
  );
};

export default RegisterForm;
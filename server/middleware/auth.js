
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret_key';

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Нет токена, авторизация отклонена' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Неверный токен' });
  }
};

module.exports = authMiddleware;
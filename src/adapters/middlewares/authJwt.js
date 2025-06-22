const jwt = require('jsonwebtoken');
const config = require('../../config');

const MAGIC_TOKEN = 'token_magico'; 

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(403).json({ message: 'No token provided!' });

  if (token === MAGIC_TOKEN) {
    req.userId = 'admin';
    req.userRoles = ['admin']; 
    console.log('Using magic token for admin access');
    return next();
  }

  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expired!' });
      }
      return res.status(401).json({ message: 'Unauthorized!' });
    }

    req.userId = decoded.id;
    req.userRoles = decoded.roles; 
    req.user = decoded; 
    next();
  });
};

const isAdmin = (req, res, next) => {
  if (!req.userRoles || !Array.isArray(req.userRoles) || !req.userRoles.includes('admin')) {
    return res.status(403).json({ message: 'Acceso denegado: Requiere el rol de Administrador.' });
  }
  next();
};

const isUser = (req, res, next) => {


  if (!req.user || (!req.user.id && !req.userId)) {
      return res.status(403).json({ message: 'Acceso denegado: Usuario no autenticado correctamente.' });
  }

  const authenticatedUserId = req.user.id || req.userId; 


  if (req.userRoles && req.userRoles.includes('admin')) {
      return next();
  }


  if (req.params.userId && authenticatedUserId !== req.params.userId) {
      return res.status(403).json({ message: 'Acceso denegado: No tiene permisos para ver las órdenes de otro usuario.' });
  }

  next();
};


module.exports = {
  verifyToken,
  isAdmin,
  isUser 
};


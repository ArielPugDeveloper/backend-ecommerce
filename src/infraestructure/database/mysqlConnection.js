const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Comidarica15#',
  database: 'ecommerce',
  waitForConnections: true,
  charset: 'utf8mb4_general_ci',
  connectTimeout: 10000,
});

pool
  .getConnection()
  .then(conn => {
    console.log('✔️  Conexión a MySQL establecida');
    conn.release();
  })
  .catch(err => {
    console.error('✖️  Error al conectar a MySQL', err.message);
  });

module.exports = pool;
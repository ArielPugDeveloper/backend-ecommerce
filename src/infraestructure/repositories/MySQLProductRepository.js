const pool = require('../database/mysqlConnection');

class MySQLProductRepository {
  async create(productEntity) {
    const name        = productEntity.name;
    const description = productEntity.description;
    const price       = productEntity.price;
    const stock       = productEntity.stock;
    const category    = productEntity.category;
    const imageUrl    = productEntity.imageUrl || 'no-image.jpg';

    const sql = `
      INSERT INTO product
        (name, description, price, stock, category, imageUrl)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const [result] = await pool.execute(sql, [
      name,
      description,
      price,
      stock,
      category,
      imageUrl
    ]);
    console.log('>>> MySQLProductRepository.create result:', result);
    // Devuelve el objeto “similar” a lo que haría Mongo: { id, ... }
    return {
      id: result.insertId,
      name,
      description,
      price,
      stock,
      category,
      imageUrl,
      createdAt: new Date(), // MySQL llenará el campo, pero aquí podemos simularlo
      updatedAt: new Date()
    };
  }
  async getAll() {
    const [rows] = await pool.execute('SELECT * FROM products');
    return rows;
  }
}

module.exports = MySQLProductRepository;
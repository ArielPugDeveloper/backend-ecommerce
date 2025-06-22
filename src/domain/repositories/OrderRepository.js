class OrderRepository {
  /**
   * Crea una nueva orden en la base de datos.
   * @param {Order} order - La entidad Order a crear.
   * @returns {Promise<Order>} La orden creada, posiblemente con un ID asignado.
   */
  async create(order) {
    throw new Error('Method not implemented');
  }

  /**
   * Obtiene una orden por su ID.
   * @param {string} id - El ID de la orden.
   * @returns {Promise<Order|null>} La entidad Order si se encuentra, de lo contrario null.
   */
  async getById(id) {
    throw new Error('Method not implemented');
  }

  /**
   * Obtiene todas las órdenes para un usuario específico.
   * @param {string} userId - El ID del usuario.
   * @returns {Promise<Order[]>} Un array de entidades Order.
   */
  async getByUserId(userId) {
    throw new Error('Method not implemented');
  }

  /**
   * Actualiza una orden existente.
   * @param {string} id - El ID de la orden a actualizar.
   * @param {object} updates - Un objeto con los campos a actualizar (ej. { status: 'shipped' }).
   * @returns {Promise<Order|null>} La orden actualizada si se encuentra, de lo contrario null.
   */
  async update(id, updates) {
    throw new Error('Method not implemented');
  }

  /**
   * Elimina una orden por su ID.
   * @param {string} id - El ID de la orden a eliminar.
   * @returns {Promise<boolean>} True si la orden fue eliminada, false en caso contrario.
   */
  async delete(id) {
    throw new Error('Method not implemented');
  }
}

module.exports = OrderRepository;
class CouponRepository {
  /**
   * Crea un nuevo cupón en la base de datos.
   * @param {Coupon} coupon - La entidad Coupon a crear.
   * @returns {Promise<Coupon>} El cupón creado, posiblemente con un ID asignado.
   */
  async create(coupon) {
    throw new Error('Method not implemented');
  }

  /**
   * Obtiene un cupón por su ID.
   * @param {string} id - El ID del cupón.
   * @returns {Promise<Coupon|null>} La entidad Coupon si se encuentra, de lo contrario null.
   */
  async getById(id) {
    throw new Error('Method not implemented');
  }

  /**
   * Obtiene un cupón por su código.
   * @param {string} code - El código del cupón (ej. "SUMMER20").
   * @returns {Promise<Coupon|null>} La entidad Coupon si se encuentra, de lo contrario null.
   */
  async getByCode(code) {
    throw new Error('Method not implemented');
  }

  /**
   * Actualiza un cupón existente.
   * @param {string} id - El ID del cupón a actualizar.
   * @param {object} updates - Un objeto con los campos a actualizar (ej. { usedCount: 1, isActive: false }).
   * @returns {Promise<Coupon|null>} El cupón actualizado si se encuentra, de lo contrario null.
   */
  async update(id, updates) {
    throw new Error('Method not implemented');
  }

  /**
   * Elimina un cupón por su ID.
   * @param {string} id - El ID del cupón a eliminar.
   * @returns {Promise<boolean>} True si el cupón fue eliminado, false en caso contrario.
   */
  async delete(id) {
    throw new Error('Method not implemented');
  }
}

module.exports = CouponRepository;
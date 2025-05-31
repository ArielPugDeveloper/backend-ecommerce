
////////TAREAAAAA 1



const getCategories = (req, res) => {
  res.json({ message: 'Lista de categorías' });
};

const createCategory = (req, res) => {
  const { name } = req.body;
  // Aquí podrías llamar un caso de uso
  res.status(201).json({ message: `Categoría creada: ${name}` });
};

module.exports = {
  getCategories,
  createCategory
};
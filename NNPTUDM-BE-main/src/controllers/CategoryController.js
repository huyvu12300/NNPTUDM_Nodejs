const CategoryService = require('../services/CategoryService');

const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) {
      return res.status(400).json({
        status: 'ERR',
        message: 'Name is required for category creation',
      });
    }
    const response = await CategoryService.createCategory({ name, description });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'An error occurred while creating the category',
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const data = req.body;
    if (!categoryId) {
      return res.status(400).json({
        status: 'ERR',
        message: 'Category ID is required for updating',
      });
    }
    const response = await CategoryService.updateCategory(categoryId, data);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'An error occurred while updating the category',
    });
  }
};

const getDetailCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    if (!categoryId) {
      return res.status(400).json({
        status: 'ERR',
        message: 'Category ID is required to get details',
      });
    }
    const response = await CategoryService.getDetailCategory(categoryId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'An error occurred while fetching category details',
    });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const response = await CategoryService.getAllCategories();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'An error occurred while fetching all categories',
    });
  }
};

module.exports = {
  createCategory,
  updateCategory,
  getDetailCategory,
  getAllCategories,
};

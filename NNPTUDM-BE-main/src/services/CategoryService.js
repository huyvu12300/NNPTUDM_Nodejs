const Category = require("../models/CategoryModel");

const createCategory = (newCategory) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { name, description } = newCategory;
      const existingCategory = await Category.findOne({ name });
      if (existingCategory) {
        resolve({
          status: 'ERR',
          message: 'Category already exists',
        });
      } else {
        const createdCategory = await Category.create({ name, description });
        resolve({
          status: 'OK',
          message: 'Category created successfully',
          data: createdCategory,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const updateCategory = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const updatedCategory = await Category.findByIdAndUpdate(id, data, { new: true });
      if (!updatedCategory) {
        resolve({
          status: 'ERR',
          message: 'Category not found',
        });
      } else {
        resolve({
          status: 'OK',
          message: 'Category updated successfully',
          data: updatedCategory,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getDetailCategory = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const category = await Category.findById(id);
      if (!category) {
        resolve({
          status: 'ERR',
          message: 'Category not found',
        });
      } else {
        resolve({
          status: 'OK',
          message: 'Category details retrieved successfully',
          data: category,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getAllCategories = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allCategories = await Category.find();
      resolve({
        status: 'OK',
        message: 'All categories retrieved successfully',
        data: allCategories,
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createCategory,
  updateCategory,
  getDetailCategory,
  getAllCategories,
};

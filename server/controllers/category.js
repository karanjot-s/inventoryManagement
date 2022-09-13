const { findById } = require("../models/Category");
const Category = require("../models/Category");
const Product = require("../models/Product");

exports.create = async (req, res) => {
  try {
    const { name, detail } = req.body;

    if (await Category.findOne({ name: name })) {
      return res.status(406).json({
        error: "Category already exists",
      });
    }

    const category = await Category.create({
      name: name,
      detail: detail,
    });

    res.status(200).json({
      success: true,
      category: category,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Something went wrong",
    });
  }
};

exports.getAll = async (req, res) => {
  try {
    const categories = await Category.find();

    res.status(200).json({
      success: true,
      categories,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Something went wrong",
    });
  }
};

exports.getOne = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(200).json({
      success: true,
      category: category,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Something went wrong",
    });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const newCategory = req.body;
    const oldCategory = await Category.findById(id);

    if (
      newCategory.name &&
      oldCategory.name != newCategory.name &&
      (await Category.findOne({ name: newCategory.name }))
    )
      return res.status(406).json({
        error: "Category with this name already exists",
      });

    const category = await oldCategory.updateOne(newCategory);

    // const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({
        error: "Category Not found",
      });
    }

    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Something went wrong",
      err: err,
    });
  }
};

exports.deleteCat = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findByIdAndDelete(id);

    await Product.deleteMany({ category: category._id });

    if (!category) {
      return res.status(404).json({
        error: "Category Not found",
      });
    }

    return res.status(200).json({
      success: true,
      category: category,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Something went wrong",
      err: err,
    });
  }
};

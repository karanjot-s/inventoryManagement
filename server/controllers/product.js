const Category = require("../models/Category");
const Product = require("../models/Product");

exports.create = async (req, res) => {
  try {
    const { name, detail, category } = req.body;

    if (await Product.findOne({ name: name })) {
      return res.status(406).json({
        error: "Product already exists",
      });
    }

    const product = await Product.create({
      name: name,
      detail: detail,
      category: category,
    });

    res.status(200).json({
      success: true,
      product: product,
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
    const products = await Product.find();

    res.status(200).json({
      success: true,
      products,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Something went wrong",
    });
  }
};

exports.getEverything = async (req, res) => {
  try {
    const products = await Product.find();
    const category = await Category.find();

    res.status(200).json({
      success: true,
      products,
      category,
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

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const category = await Category.findOne({ name: product.category });

    res.status(200).json({
      success: true,
      product,
      category,
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
    const newProduct = req.body;
    const oldProduct = await Product.findById(id);

    // if (newProduct.name && (await Product.findOne({ name: newProduct.name })))
    if (
      newProduct.name &&
      oldProduct.name != newProduct.name &&
      (await Product.findOne({ name: newProduct.name }))
    )
      return res.status(406).json({
        error: "Product with this name already exists",
      });

    const product = await oldProduct.updateOne(newProduct);

    if (!product) {
      return res.status(404).json({
        error: "Product Not found",
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Something went wrong",
      err: err,
    });
  }
};

exports.deletePrd = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        error: "Product Not found",
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Something went wrong",
      err: err,
    });
  }
};

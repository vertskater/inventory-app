const db = require("../db/querys");
const { body, validationResult } = require("express-validator");
const ForeignKeyConstraintError = require("../errors/ForeignKeyConstraintError");
const asyncHander = require("express-async-handler");

const validationShema = [
  body("name").isAlpha().withMessage("name must be Alphanumeric"),
  body("description")
    .isLength({ min: 10, max: 150 })
    .withMessage("description must be at least 10 and max 150 characters."),
];

const getDocumentsById = async (req, res) => {
  const catId = req.params.id;
  const documents = await db.getDocumentsByCatId(catId);
  const categories = await db.getAllCategories();
  console.log(documents);
  res.render("inventory-list", {
    title: `Documents per category`,
    docs: documents,
    categories: categories,
  });
};

const addCategoryGet = async (req, res) => {
  res.render("cat-form", {
    title: "Add new Category",
    category: {},
  });
};

const addCategoryPost = [
  validationShema,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const categories = await db.getAllCategories();
      return res.render("cat-form", {
        title: "Incorrect Form Values",
        categories: categories,
        doc: {},
        errors: errors.array(),
      });
    }
    const { name, description } = req.body;
    await db.addNewCategory(name, description);
    res.redirect("/documents");
  },
];

const editCategoriesGet = async (req, res) => {
  const categories = await db.getAllCategories();
  res.render("categories-list", {
    title: "Edit categories",
    categories: categories,
  });
};
const editCategoryPost = async (req, res) => {
  const id = req.params.id;
  const catData = {
    name: req.body.name,
    description: req.body.description,
  };
  await db.updateCategory(catData, id);
  res.redirect("/category/edit");
};

const deleteCategory = asyncHander(async (req, res) => {
  const id = req.params.id;
  try {
    await db.deleteCategoryById(id);
  } catch (error) {
    throw new ForeignKeyConstraintError(
      "Please delete all Documents in this Category first"
    );
  }
  res.redirect("/category/edit");
});

const editSingleCatGet = async (req, res) => {
  const id = req.params.id;
  const category = await db.getCategoryById(id);
  console.log(category);
  res.render("cat-form", {
    title: "Edit Category",
    category: category[0],
  });
};

module.exports = {
  getDocumentsById,
  addCategoryGet,
  addCategoryPost,
  editCategoriesGet,
  deleteCategory,
  editSingleCatGet,
  editCategoryPost,
};

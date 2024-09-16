const db = require("../db/querys");
const { body, validationResult } = require("express-validator");

const alphaError = "must only contain letters";
const lenError = "must between 5 and 50 characters";
const intError = "must be a Number";

const validationShema = [
  body("title")
    .trim()
    .isAlpha()
    .withMessage(`title ${alphaError}`)
    .isLength({ min: 5, max: 50 })
    .withMessage(`title ${lenError}`),
  body("pages").isInt().withMessage(`pages ${intError}`),
  body("category").isInt().withMessage("choose a correct category"),
  body("file")
    .notEmpty()
    .matches(/[A-Za-z/:]/)
    .withMessage(
      `file is required, only Letters and special Chars (/, :) allowed`
    ),
];

const getLatestDocs = async (req, res) => {
  const categories = await db.getAllCategories();
  const documents = await db.getLatestDocuments();
  res.render("inventory-list", {
    title: "Latest Document",
    categories: categories,
    docs: documents,
  });
};

const getDocumentsByCat = (req, res) => {
  const cat = req.params.cat;
  console.log(cat);
};

const getCategories = async (req, res) => {
  const categories = await db.getAllCategories();
  res.render("doc-form", {
    title: "Add Document",
    categories: categories,
    doc: {},
  });
};

const addDocument = [
  validationShema,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const categories = await db.getAllCategories();
      return res.render("doc-form", {
        title: "Incorrect Form Values",
        categories: categories,
        doc: {},
        errors: errors.array(),
      });
    }
    const { title, pages, category, file } = req.body;
    await db.saveNewDoc({ title, pages, category, file });
    res.redirect("/documents");
  },
];

const deleteDocument = async (req, res) => {
  const id = req.params.id;
  await db.deleteDoc(id);
  res.redirect("/documents");
};

const editDocumentGet = async (req, res) => {
  const id = req.params.id;
  const categories = await db.getAllCategories();
  const document = await db.getDocumentById(id);
  res.render("doc-form", {
    title: "Edit Document",
    categories: categories,
    doc: document,
  });
};
const editDocumentPost = [
  validationShema,
  async (req, res) => {
    const document = {
      id: req.params.id,
      title: req.body.title,
      pages: req.body.pages,
      category: req.body.category,
      file: req.body.file,
    };
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const categories = await db.getAllCategories();
      return res.render("doc-form", {
        title: "Incorrect Form Values",
        categories: categories,
        doc: document,
        errors: errors.array(),
      });
    }
    await db.editDocument(document);
    res.redirect("/documents");
  },
];

module.exports = {
  getLatestDocs,
  getDocumentsByCat,
  getCategories,
  addDocument,
  deleteDocument,
  editDocumentGet,
  editDocumentPost,
};

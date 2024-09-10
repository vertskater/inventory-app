const db = require("../db/querys");
const express = require("express");
const path = require("path");

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

const addDocument = async (req, res) => {
  const { title, pages, category, file } = req.body;
  await db.saveNewDoc({ title, pages, category, file });
  res.redirect("/documents");
};

const deleteDocument = async (req, res) => {
  const id = req.params.id;
  await db.deleteDoc(id);
  res.redirect("/documents");
};

const editDocumentGet = async (req, res) => {
  const id = req.params.id;
  const document = await db.getDocumentById(id);
  const categories = await db.getAllCategories();
  res.render("doc-form", {
    title: "Edit Document",
    categories: categories,
    doc: document,
  });
};
const editDocumentPost = async (req, res) => {
  const document = {
    id: req.params.id,
    title: req.body.title,
    pages: req.body.pages,
    category: req.body.category,
    file: req.body.file,
  };
  await db.editDocument(document);
  res.redirect("/documents");
};

module.exports = {
  getLatestDocs,
  getDocumentsByCat,
  getCategories,
  addDocument,
  deleteDocument,
  editDocumentGet,
  editDocumentPost,
};

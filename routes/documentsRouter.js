const { Router } = require("express");
const documentsRouter = Router();

const documentController = require("../controllers/documentController");
documentsRouter.get("/", documentController.getLatestDocs);
documentsRouter.get("/new", documentController.getCategories);
documentsRouter.post("/new", documentController.addDocument);
documentsRouter.get("/delete/:id", documentController.deleteDocument);
documentsRouter.get("/edit/:id", documentController.editDocumentGet);
documentsRouter.post("/edit/:id", documentController.editDocumentPost);
documentsRouter.use("/:cat", documentController.getDocumentsByCat);

module.exports = documentsRouter;

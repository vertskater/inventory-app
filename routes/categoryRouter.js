const { Router } = require("express");
const categoryRouter = Router();

const categoryController = require("../controllers/categoryController");
categoryRouter.get("/new", categoryController.addCategoryGet);
categoryRouter.post("/new", categoryController.addCategoryPost);
categoryRouter.get("/edit", categoryController.editCategoriesGet);
categoryRouter.get("/edit/:id", categoryController.editSingleCatGet);
categoryRouter.post("/edit/:id", categoryController.editCategoryPost);
categoryRouter.get("/delete/:id", categoryController.deleteCategory);
categoryRouter.get("/:cat/:id", categoryController.getDocumentsById);

module.exports = categoryRouter;

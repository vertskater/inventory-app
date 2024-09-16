const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3000;

//set template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
//set assets dir
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("public"));
//init Form data (body) use
app.use(express.urlencoded({ extended: true }));

const indexRouter = require("./routes/indexRouter");
app.use("/", indexRouter);

const documentsRouter = require("/routes/documentsRouter");
app.use("/documents", documentsRouter);

const categoryRouter = require("./routes/categoryRouter");
app.use("/category", categoryRouter);

app.use((err, req, res, next) => {
  res.render("error", { err: err });
});

app.listen(PORT, "0.0.0.0");

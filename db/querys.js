const pool = require("./pool");

module.exports = {
  getAllCategories: async (limit = 10) => {
    const { rows } = await pool.query("SELECT * FROM categories LIMIT $1;", [
      limit,
    ]);
    return rows;
  },
  getLatestDocuments: async (limit = 10) => {
    const { rows } = await pool.query(
      "SELECT d.id, d.title, d.pages, d.file, c.name as category FROM documents AS d JOIN categories as c ON d.category = c.id LIMIT $1;",
      [limit]
    );
    return rows;
  },
  saveNewDoc: async (doc) => {
    await pool.query(
      "INSERT INTO documents (title, pages, category, file) VALUES ($1, $2, $3, $4)",
      [doc.title, doc.pages, doc.category, doc.file]
    );
  },
  deleteDoc: async (id) => {
    await pool.query("DELETE FROM documents WHERE id=$1", [id]);
  },
  getDocumentById: async (id) => {
    const { rows } = await pool.query("SELECT * FROM documents WHERE id=$1", [
      id,
    ]);
    return rows[0];
  },
  editDocument: async (doc) => {
    await pool.query(
      "UPDATE documents SET title = $1, pages = $2, category = $3, file = $4 WHERE id=$5",
      [doc.title, doc.pages, doc.category, doc.file, doc.id]
    );
  },
};

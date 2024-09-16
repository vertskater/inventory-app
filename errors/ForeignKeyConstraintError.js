class ForeignKeyConstraintError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
    this.name = "Foreign Key Constraint Error";
  }
}

module.exports = ForeignKeyConstraintError;

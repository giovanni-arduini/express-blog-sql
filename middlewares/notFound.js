function notFound(req, res, next) {
  res.status(404).json({
    error: "not found",
    message: "Pagina non trovata!",
  });
}

module.exports = notFound;

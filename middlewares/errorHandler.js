// function errorHandler(err, req, res, next) {
//   res.status(500);
//   res.json({
//     error: 500,
//     message: err.message,
//   });
// }

function errorHandler(req, res, next) {
  res.status(500).json({
    error: 500,
    message: `Errore`,
  });
}

module.exports = errorHandler;

var errorHandler = function (err, req, res, next) {
    var statusCode = err.statusCode || 400;
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? "🍮" : err.stack, // only show stack in development mode
    });
};
var notFound = function (req, res, next) {
    var error = new Error("Not Found - ".concat(req.originalUrl));
    error.statusCode = 404;
    next(error);
};
export { errorHandler, notFound };

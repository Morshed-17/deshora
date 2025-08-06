const errorHandlerMiddleware = async (err, req, res, next) => {
  if (!res.statusCode || res.statusCode === 200) {
    return res.status(500).json({
      error: "Internal server Error",
      message: err.message,
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }

  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

export default errorHandlerMiddleware;

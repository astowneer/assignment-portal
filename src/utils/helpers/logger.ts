const logError = (error: unknown) => {
  if (process.env.NODE_ENV === "development") {
    console.error(error);
  }
};

export { logError };

export function handleError(err, defaultMessage) {
    if (err.response?.data?.message) {
      throw new Error(err.response.data.message);
    } else {
      console.error(err);
      throw new Error(defaultMessage);
    }
  }
const generateShortDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');

  return `${year}${month}`;
};

const getDateTime = () => {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  const dateString = `${year}${month}${day}`;
  return dateString;
};

module.exports = {
  getDateTime,
  generateShortDate,
};

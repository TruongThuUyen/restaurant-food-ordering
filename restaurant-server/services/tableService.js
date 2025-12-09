const Table = require('../models/Table');

const getTableAvailable = async () => {
  const tables = await Table.find({ status: 'available' });
  return tables;
};

const updateTableStatus = async (table, status) => {
  if (!table) return;
  table.status = status;
  await table.save();
  return table;
};

module.exports = {
  getTableAvailable,
  updateTableStatus,
};

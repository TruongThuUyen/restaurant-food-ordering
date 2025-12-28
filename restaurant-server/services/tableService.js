const Table = require('../models/Table');
const { TableStatus } = require('../models/utils');

const getTableAvailable = async () => {
  const tables = await Table.find({ status: 'available' });
  return tables;
};

const updateTableStatus = async (table, status) => {
  if (!TableStatus.includes(status)) throw new Error('Invalid table status!');

  const updatedTable = await Table.findByIdAndUpdate(table._id, { status }, { new: true });
  if (!updatedTable) {
    throw new Error('Table not found!');
  }

  return updatedTable;
};

module.exports = {
  getTableAvailable,
  updateTableStatus,
};

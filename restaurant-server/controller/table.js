const Table = require('../models/Table');
const tableService = require('../services/tableService');

const getTableAvailable = async (req, res) => {
  try {
    const tables = await tableService.getTableAvailable();

    res.status(200).json({
      status: 2000,
      success: true,
      data: tables,
    });
  } catch (error) {
    res.status(500).json({ status: 5000, success: false, message: 'Error when fetch tables!' });
  }
};

const updateTableStatus = async (req, res) => {
  try {
    const value = req.body.value;
    const table = await Table.findOne({ value });
    if (!table)
      return res.status(404).json({ status: 4040, success: false, message: 'Table not found!' });

    const updatedTable = await tableService.updateTableStatus(table, req.body.status);
    res.status(200).json({
      status: 2000,
      success: true,
      message: 'Update table status successfully!',
      data: updatedTable,
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: 5000, success: false, message: 'Error when update status of table!' });
  }
};

module.exports = {
  getTableAvailable,
  updateTableStatus,
};

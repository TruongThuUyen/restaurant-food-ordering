const Table = require('../models/Table');
const tableService = require('../services/tableService');

const getTableAvailable = async (req, res) => {
  try {
    const tables = await tableService.getTableAvailable();
    res.status(200).json({
      status: 2000,
      success: true,
      message: 'Remove item from cart successfully!',
      data: tables,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error when fetch tables!' });
  }
};

const updateTableStatus = async (req, res) => {
  try {
    const value = req.body.value;
    const table = await Table.findOne({ value });
    if (!table)
      return res.status(400).json({ status: 4000, success: true, message: 'Table not found!' });

    const tableResponse = await tableService.updateTableStatus(table, req.body.status);
    if (tableResponse) {
      res.status(200).json({
        status: 2000,
        success: true,
        message: 'Update table status successfully!',
        data: tableResponse,
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error when update status of table!' });
  }
};

module.exports = {
  getTableAvailable,
  updateTableStatus,
};

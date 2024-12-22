const db = require('../config/db');

// Fetch all cafes from database
exports.getCafes = (req, res) => {
  const sql = 'SELECT * FROM cafes';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching cafes:', err);
      return res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    }
    res.status(200).json(results);
  });
};

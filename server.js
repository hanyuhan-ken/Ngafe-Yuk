const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const cafeRoutes = require('./routes/cafeRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ 
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use('/api', authRoutes);
app.use('/api', cafeRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRout');
const { sequelize } = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;


// Enable CORS to allow frontend to communicate with backend
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

// Middleware to parse JSON requests
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send("Backend is running!");
});

// Database Connection
sequelize.sync().then(() => console.log('Database connected successfully')).catch(err => console.error('DB Error:', err));

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

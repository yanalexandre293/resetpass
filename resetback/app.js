//app.js
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3003;

const authenticateToken = require('./middleware/authMiddleware');
const mailController = require("./controllers/mailController");
const userRoutes = require('./routes/userRouter');

app.use(express.json());
app.use(cors());

app.use('/users', userRoutes);
app.get('/status', authenticateToken, async (req, res) => res.json({ message: 'API is up and running' }));

app.listen(port, () => console.log(`App listening on port ${port}! \nhttp://localhost:${port}`));
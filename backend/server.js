const express = require('express');
const app = express();
const connectDB = require('./config/db')
const dotenv = require('dotenv')
const userRoutes = require('./routes/userRoutes')
const adminRoutes = require('./routes/adminRoutes')
const {notFound,errorHandler} = require("./middlewares/errorMiddleware")

const PORT = process.env.PORT || 5000;

dotenv.config();
connectDB();

app.use(express.json())
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes)
app.use(notFound);
app.use(errorHandler)

app.listen(PORT, console.log(`server started on port: ${PORT}`));
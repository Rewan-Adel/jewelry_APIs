const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const mongoose = require('mongoose');
const productRouter = require('./Route/product.route');

require('dotenv').config();
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

//Database connection
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('Database connected');
}).catch((err) => {
    console.log('Database connection failed', err);
});

app.use('/api/product', productRouter);

app.all('*', (req, res) => {
    return res.status(404).json({
        status: 'fail',
        code: 404,
        message: `Can't find ${req.originalUrl} on this server!`
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

module.exports = app;
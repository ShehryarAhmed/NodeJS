const mongoose = require('mongoose');
const genres = require('./genres')
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost/vidly')
.then(() => { console.log('Connected to MongoDB...')})
.catch(err => console.error('Cloud not Connected to MongoDB...',err))


app.use(express.json())
app.use('/api/genres', genres);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`))


const express = require('express')

const app = express();
const PORT = process.env.PORT || 3000;
const cache = require('./cache');

const blogStatsRouter = require('./routes/blogStats')
const blogSearchRouter = require('./routes/blogSearch')

app.use('/api/blog-stats', blogStatsRouter);
app.use('/api/blog-search', blogSearchRouter)

app.listen(PORT, () => {
    console.log(`Server is on port ${PORT}`)
})
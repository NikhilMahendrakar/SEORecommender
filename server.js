const express = require('express');
const { scrapePage } = require('./scraper');
const { manualSEOAnalysis } = require('./analyze');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

app.post('/analyze', async (req, res) => {
    const { url } = req.body;
    const pageData = await scrapePage(url);

    if (pageData) {
        const analysis = await manualSEOAnalysis(pageData);
        res.json({ ...pageData, analysis });
    } else {
        res.status(500).json({ error: 'Failed to scrape the page' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

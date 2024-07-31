const axios = require('axios');
const cheerio = require('cheerio');

async function scrapePage(url) {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        
        // Extract the title
        const title = $('title').text();

        // Extract the description
        const description = $('meta[name="description"]').attr('content') || '';

        // Extract keywords
        const keywords = $('meta[name="keywords"]').attr('content') || '';

        // Extract headings
        const headings = [];
        $('h1, h2, h3, h4, h5, h6').each((i, elem) => {
            headings.push($(elem).text());
        });

        // Extract images
        const images = [];
        $('img').each((i, elem) => {
            images.push($(elem).attr('src'));
        });

        // Extract links
        const links = [];
        $('a').each((i, elem) => {
            links.push($(elem).attr('href'));
        });

        // Extract paragraphs
        const paragraphs = [];
        $('p').each((i, elem) => {
            paragraphs.push($(elem).text());
        });

        // Extract scripts
        const scripts = [];
        $('script[src]').each((i, elem) => {
            scripts.push($(elem).attr('src'));
        });

        // Extract body text
        const bodyText = $('body').text();

        // Calculate word count
        const wordCount = bodyText.split(/\s+/).length;

        // Calculate BM25 score
        const bm25Score = calculateBM25(bodyText);

        return {
            title,
            description,
            keywords,
            headings,
            images,
            links,
            paragraphs,
            scripts,
            bodyText,
            wordCount,
            bm25Score
        };
    } catch (error) {
        console.error(`Error scraping the page: ${error.message}`);
        return null;
    }
}

function calculateBM25(text) {
    const k1 = 1.5;  // term frequency saturation parameter
    const b = 0.75;  // length normalization parameter
    const averageDocumentLength = 1000;  // average length of a document in the corpus
    const documentLength = text.split(/\s+/).length;
    const keywords = ['example', 'keyword1', 'keyword2'];  // Replace with your set of keywords

    let score = 0;

    keywords.forEach(keyword => {
        const termFrequency = (text.match(new RegExp(`\\b${keyword}\\b`, 'gi')) || []).length;
        const idf = Math.log(1 + (1000 - termFrequency + 0.5) / (termFrequency + 0.5));  // inverse document frequency
        score += idf * ((termFrequency * (k1 + 1)) / (termFrequency + k1 * (1 - b + b * (documentLength / averageDocumentLength))));
    });

    return score;
}

module.exports = { scrapePage };

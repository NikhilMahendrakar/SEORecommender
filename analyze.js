const axios = require('axios');
const cheerio = require('cheerio');
const { Configuration, OpenAIApi } = require('openai');

const API_KEY = process.env.OPENAI_API_KEY;  // Replace with your OpenAI API key

const configuration = new Configuration({
    apiKey: API_KEY,
});
const openai = new OpenAIApi(configuration);

async function manualSEOAnalysis(data) {
    const prompt = `
    Based on the following data extracted from a website, provide recommendations for improving the content and SEO:
    Just give a brief of 50-75 words.
    Title: ${data.title}
    Description: ${data.description}
    Keywords: ${data.keywords}
    Headings: ${data.headings.join(', ')}
    Images: ${data.images.join(', ')}
    Links: ${data.links.join(', ')}
    Paragraphs: ${data.paragraphs.join(' ')}
    Scripts: ${data.scripts.join(', ')}
    Word Count: ${data.wordCount}
    BM25 Score: ${data.bm25Score}

    
`;

try {
    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: "You are an SEO expert." },
            { role: "user", content: prompt }
        ],
        max_tokens: 500  
    });

    const recommendations = response.data.choices[0].message.content.trim();
    console.log('Recommendations:', recommendations);
    return recommendations;
} catch (error) {
    console.error('Error generating recommendations:', error.response ? error.response.data : error.message);
}
}



module.exports = { manualSEOAnalysis };

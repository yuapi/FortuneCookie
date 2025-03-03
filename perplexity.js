const fetch = require('node-fetch');
require('dotenv').config();

const baseUrl = 'https://api.perplexity.ai';
const api_key = process.env.PERPLEXITY_API_KEY;

module.exports = {
    chatCompletions
};

async function chatCompletions(prompt) {
    const options = {
        method: 'POST',
        headers: {Authorization: `Bearer ${api_key}`, 'Content-Type': 'application/json'},
        body: `{"model": "sonar","messages": ${prompt},"max_tokens": 500,"temperature": 0.7,"top_p": 1.0}`
    };

    try {
        const response = await fetch(baseUrl + '/chat/completions', options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data.choices[0].message.content;
    }
    catch (error) {
        console.error(`Error fetching data: ${error.message}`);
    }
}
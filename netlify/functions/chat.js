const { GoogleGenerativeAI } = require('@google/generative-ai');

exports.handler = async (event, context) => {
  // Only accept POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const { prompt } = JSON.parse(event.body);

    if (!prompt) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Prompt is required' }),
      };
    }

    const API_KEY = process.env.VITE_GEMINI_API_KEY;

    if (!API_KEY) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'API Key not configured in Netlify Environment Variables.' }),
      };
    }

    // Initialize Gemini
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ response: text }),
    };
  } catch (error) {
    console.error('Netlify Function Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};

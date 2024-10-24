const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); // Enable CORS for all routes
app.use(express.json());

const apiKey = process.env.GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-pro',
    systemInstruction: 'Answer Only!',
});

const generationConfig = {
    temperature: 0.3,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: 'text/plain',
};

app.post('/ask', async (req, res) => {
    try {
        const message = req.body.query;
        const chatSession = await model.startChat({
            generationConfig,
            history: [],
        });
        const result = await chatSession.sendMessage(message);
        res.json({ response: result.response.text() });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error generating response' });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

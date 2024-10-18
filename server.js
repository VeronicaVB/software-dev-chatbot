// process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const express = require('express');
const path = require('path');
const { OpenAIAPI } = require('./openai');
const app = express();
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/getChatbotResponse', async (req, res) => {
    try {
        const userMessage = req.body.userMessage;
        const chatbotResponse = await OpenAIAPI.generateResponse(userMessage);
        res.json({ chatbotResponse });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const fetch = require('node-fetch');
const { OpenAIAPIKey } = require('./config');

class OpenAIAPI {
    static async generateResponse(userMessage, conversationHistory = []) {
        try {
            const apiKey = OpenAIAPIKey;
            const endpoint = 'https://api.openai.com/v1/chat/completions';
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo-1106",
                    messages: conversationHistory.concat([{ role: 'user', content: userMessage }]),
                    max_tokens: 150,
                }),
            });
            const responseData = await response.json();
            console.log('Response from OpenAI API:', responseData);

            // Check if the choices array is defined and not empty
            if (responseData.choices && responseData.choices.length > 0 && responseData.choices[0].message) {
                return responseData.choices[0].message.content;
            } else {
                console.error('Error: No valid response from OpenAI API');
                return 'Sorry, I couldn\'t understand that.';
            }
        } catch (error) {
            console.error('Error:', error);
            return 'Sorry, an error occurred while processing your request.';
        }
    }
}

module.exports = { OpenAIAPI };

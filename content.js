// Function to send a message to the AI server and get the answer
function getAnswerFromAI(question, choices) {
    const message = `Question: ${question}\nChoices:\n${choices.join('\n')}`;
    return fetch('https://your-vercel-deployment-url.vercel.app/ask', { // Replace with your Vercel URL
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: message }),
    })
    .then(response => response.json())
    .then(data => data.response)
    .catch(error => {
        console.error('Error:', error);
        return null;
    });
}

// Other functions remain the same...

handleQuizAutomation();

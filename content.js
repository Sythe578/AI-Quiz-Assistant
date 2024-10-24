// Function to save the current page URL to Chrome storage
function saveCurrentPage() {
    const currentPage = window.location.href;
    chrome.storage.local.set({ savedPage: currentPage }, () => {
        alert('Page saved successfully!');
    });
}

// Function to go to the saved page
function goToSavedPage() {
    chrome.storage.local.get(['savedPage'], (result) => {
        if (result.savedPage) {
            window.location.href = result.savedPage;
        } else {
            alert('No saved page found.');
        }
    });
}

// Function to send a message to the AI server and get the answer
function getAnswerFromAI(question, choices) {
    const message = `Question: ${question}\nChoices:\n${choices.join('\n')}`;
    return fetch('https://automated-flibzhfgs-carl-justine-dagohoys-projects.vercel.app', { // Replace with your Vercel URL
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

// Function to select the correct answer and go to the next question
function selectAnswerAndNext(selectedAnswer, choices, nextButton) {
    choices.forEach(choice => {
        if (choice.innerText.trim() === selectedAnswer.trim()) {
            choice.click();
        }
    });
    if (nextButton) {
        nextButton.click();
    }
}

// Main function to handle the quiz automation
async function handleQuizAutomation() {
    const questionElement = document.querySelector('.question'); // Update selector
    const choices = document.querySelectorAll('.clickable-circle'); // Update selector
    const nextButton = document.querySelector('.next'); // Update selector
    if (questionElement && choices.length > 0) {
        const questionText = questionElement.innerText;
        const choicesArray = Array.from(choices).map(choice => choice.innerText);

        const selectedAnswer = await getAnswerFromAI(questionText, choicesArray);

        if (selectedAnswer) {
            selectAnswerAndNext(selectedAnswer, choices, nextButton);
        }
    }
}

// Start the automation
handleQuizAutomation();

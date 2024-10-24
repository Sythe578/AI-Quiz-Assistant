function saveCurrentPage() {
    const currentPage = window.location.href;
    chrome.storage.local.set({ savedPage: currentPage }, () => {
        alert('Page saved successfully!');
    });
}

function goToSavedPage() {
    chrome.storage.local.get(['savedPage'], (result) => {
        if (result.savedPage) {
            window.location.href = result.savedPage;
        } else {
            alert('No saved page found.');
        }
    });
}

document.getElementById('savePageButton').addEventListener('click', saveCurrentPage);
document.getElementById('goToSavedPageButton').addEventListener('click', goToSavedPage);

function getAnswerFromAI(question, choices) {
    const message = `Question: ${question}\nChoices:\n${choices.join('\n')}`;
    return fetch('https://your-vercel-app-url.vercel.app/ask', {
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

async function handleQuizAutomation() {
    const questionElement = document.querySelector('.question');
    const choices = document.querySelectorAll('.clickable-circle');
    const nextButton = document.querySelector('.next');

    if (questionElement && choices.length > 0) {
        const questionText = questionElement.innerText;
        const choicesArray = Array.from(choices).map(choice => choice.innerText);
        
        const selectedAnswer = await getAnswerFromAI(questionText, choicesArray);
        
        if (selectedAnswer) {
            selectAnswerAndNext(selectedAnswer, choices, nextButton);
        }
    }
}

handleQuizAutomation();

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.query) {
        fetch('https://your-vercel-deployment-url.vercel.app/ask', { // Replace with your Vercel URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: request.query }),
        })
        .then(response => response.json())
        .then(data => {
            sendResponse({ response: data.response });
        })
        .catch(error => {
            console.error('Error:', error);
            sendResponse({ response: 'Error processing request' });
        });
        return true;
    }
});

// Listener for saving and navigating to the saved page
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'savePage') {
        chrome.scripting.executeScript({
            target: { tabId: sender.tab.id },
            func: saveCurrentPage,
        });
    } else if (request.action === 'goToSavedPage') {
        chrome.scripting.executeScript({
            target: { tabId: sender.tab.id },
            func: goToSavedPage,
        });
    }
});

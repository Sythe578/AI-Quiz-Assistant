chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.query) {
        fetch('https://automated-3u7bv5mal-carl-justine-dagohoys-projects.vercel.app', {
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

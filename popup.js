document.getElementById("submitButton").addEventListener("click", () => {
    const query = document.getElementById("queryInput").value;
    const responseOutput = document.getElementById("responseOutput");

    chrome.runtime.sendMessage({ query }, (response) => {
        console.log("Received response:", response);
        if (response && response.response) {
            responseOutput.textContent = response.response;
        } else {
            responseOutput.textContent = "No response received.";
        }
    });
});

document.getElementById("savePageButton").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'savePage' });
    });
});

document.getElementById("goToSavedPageButton").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'goToSavedPage' });
    });
});

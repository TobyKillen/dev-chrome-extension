chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "getSessionStorage") {
        let value = sessionStorage.getItem(message.key) || "No value found";
        sendResponse({ data: value });
    } else if (message.action === "setSessionStorage") {
        sessionStorage.setItem(message.key, message.value);
        sendResponse({ success: true });
    }
    return true;
});

document.getElementById("clickMe").addEventListener("click", function() {
    alert("Hello from your Chrome Extension!");
});

document.getElementById("AssignSessionStorage").addEventListener("click", function() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: () => {
                sessionStorage.setItem("key", "value");
                alert("Session storage set in the active tab!");
            }
        });
    });
});

document.getElementById("GetSessionStorage").addEventListener("click", function() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "getSessionStorage", key: "key" }, (response) => {
            if (response) {
                alert("Session Storage Value: " + response.data);
            } else {
                alert("Failed to retrieve session storage.");
            }
        });
    });
});

document.getElementById("openNetworkTab").addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length === 0) return;

        const tabId = tabs[0].id;
        console.log("Attaching debugger to tab: " + tabId);

        chrome.debugger.attach({ tabId }, "1.3", function() {
            if (chrome.runtime.lastError) {
                alert("Error attaching debugger: " + chrome.runtime.lastError.message);
                return;
            }
            chrome.debugger.sendCommand({ tabId }, "Inspector.enable", {}, function() {
                chrome.debugger.sendCommand({ tabId }, "Page.bringToFront", {}, function() {
                    alert("DevTools opened! Please navigate to the 'Network' tab manually.");
                });
            });
        });
    });
});



document.getElementById("openConsoleTab").addEventListener("click", function() {});
document.getElementById("openApplicationTab").addEventListener("click", function() {});



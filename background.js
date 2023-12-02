chrome.commands.onCommand.addListener((command) => {
    console.log(`Command "${command}" called`);
    if (command === "accept-suggestion") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { action: "accept-suggestion" });
        });
    }
});

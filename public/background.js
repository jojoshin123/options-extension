// background.js
chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed');
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    chrome.storage.local.set({ isToggled: message.type === 'TOGGLED' });
});
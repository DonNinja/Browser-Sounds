// 'use strict';

// With background scripts you can communicate with popup
// and contentScript files.
// For more information on background script,
// See https://developer.chrome.com/extensions/background_pages

// *When windows & tabs open
browser.windows.onCreated.addListener((window) => {
    console.log(`New window: ${window.id}`);
});

browser.tabs.onCreated.addListener((tab) => {
    console.log(`New tab: ${tab.id}`);
});

// *When windows & tabs close
browser.windows.onClose.addListener((window) => {
    console.log(`Closed window: ${window.id}`);
});

browser.tabs.onClose.addListener((tab) => {
    console.log(`Closed tab: ${tab.id}`);
});

// *When tab is changed
browser.tabs.onActivated.addListener((tab) => {
    console.log(`Changed tab to ${tab.id}`);
});

// console.log(`New window: ${window.id}`);

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     if (request.type === 'SET') {
//         const message = `Set chapter count to ${request.payload.message}`;
//         chapterCount = request.payload.message;

//         // Log message coming from the `request` parameter
//         console.log(`Background received setter: ${request.payload.message}`);

//         // Send a response message
//         sendResponse({
//             message,
//         });
//     }

//     else if (request.type === 'GET') {
//         const message = chapterCount;

//         console.log(`Background received request to getter`);

//         // Send a response message
//         sendResponse({
//             message,
//         });
//     }
// });
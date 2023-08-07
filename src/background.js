// import data from '../data/sounds';
// 'use strict';

// With background scripts you can communicate with popup
// and contentScript files.
// For more information on background script,
// See https://developer.chrome.com/extensions/background_pages

createOpen();
createClosed();
createActivated();

function createOpen() {
    // *When windows & tabs open
    browser.windows.onCreated.addListener((window) => {
        console.log(`New window: ${window.id}`);
    });

    browser.tabs.onCreated.addListener((tab) => {
        console.log(`New tab: ${tab.id}`);
    });
}

function createClosed() {
    // *When windows & tabs close
    browser.windows.onRemoved.addListener((window) => {
        console.log(`Closed window: ${window.id}`);
    });

    browser.tabs.onRemoved.addListener((tab) => {
        console.log(`Closed tab: ${tab.id}`);
    });
}

function createActivated() {
    let audio = document.createElement('audio');

    let source = document.createElement('source');

    if (audio.canPlayType('audio/wav')) {
        source.type = 'audio/wav';
        source.src = '../data/sounds/test.wav';
    }
    audio.volume = 0.5;

    audio.appendChild(source);

    // *When tab is changed
    browser.tabs.onActivated.addListener(() => {
        audio.cloneNode(true).play();
    });
}
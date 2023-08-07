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
    let audio = getAudio('open');

    // *When windows & tabs open
    browser.windows.onCreated.addListener((window) => {
        // console.log(`New window: ${window.id}`);
        audio.cloneNode(true).play();
    });

    browser.tabs.onCreated.addListener((tab) => {
        // console.log(`New tab: ${tab.id}`);
        audio.cloneNode(true).play();
    });
}

function createClosed() {
    let audio = getAudio('close');

    // *When windows & tabs close
    browser.windows.onRemoved.addListener((window) => {
        // console.log(`Closed window: ${window.id}`);
        audio.cloneNode(true).play();
    });

    browser.tabs.onRemoved.addListener((tab) => {
        // console.log(`Closed tab: ${tab.id}`);
        audio.cloneNode(true).play();
    });
}

function createActivated() {
    // let audio = getAudio('change');

    // *When tab is changed
    browser.tabs.onActivated.addListener(() => {
        // audio.cloneNode(true).play();
    });
}

function getAudio(filename) {
    let audio = document.createElement('audio');

    let source = document.createElement('source');

    if (audio.canPlayType('audio/wav')) {
        source.type = 'audio/wav';
        source.src = `../data/sounds/${filename}.wav`;
    }
    if (audio.canPlayType('audio/mp3')) {
        source.type = 'audio/mp3';
        source.src = `../data/sounds/${filename}.mp3`;
    }
    audio.volume = 0.1;

    audio.appendChild(source);

    return audio;
}
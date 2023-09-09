// import data from '../data/sounds';
// 'use strict';

// With background scripts you can communicate with popup
// and contentScript files.
// For more information on background script,
// See https://developer.chrome.com/extensions/background_pages

console.clear();
console.log(`STARTUP`);

createOpen();
createClosed();
// createActivated();

let volumes = {
    'open': 0.5,
    'close': 0.5
};

function createOpen() {
    let audio = getAudio('open');

    // *When windows & tabs open
    browser.windows.onCreated.addListener((window) => {
        // console.log(`New window: ${window.id}`);
        // audio.cloneNode(true).play();
    });

    browser.tabs.onCreated.addListener((tab) => {
        console.log(`New tab: ${tab.id}`);
        let temp = audio.cloneNode(true);
        temp.volume = volumes.open;
        temp.play();
    });
}

function createClosed() {
    let audio = getAudio('close');

    // *When windows & tabs close
    browser.windows.onRemoved.addListener((window) => {
        // console.log(`Closed window: ${window.id}`);
        // audio.cloneNode(true).play();
    });

    browser.tabs.onRemoved.addListener((tab) => {
        console.log(`Closed tab`);
        let temp = audio.cloneNode(true);
        temp.volume = volumes.close;
        temp.play();
    });
}

function createActivated() {
    // let audio = getAudio('change');

    // *When tab is changed
    // browser.tabs.onActivated.addListener(() => {
    // audio.cloneNode(true).play();
    // });
}

function createKeydown() {

}

function getAudio(filename) {
    let audio = document.createElement('audio');

    let source = document.createElement('source');

    // if (audio.canPlayType('audio/wav')) {
    //     source.type = 'audio/wav';
    //     source.src = `../data/sounds/${filename}.wav`;
    // }
    if (audio.canPlayType('audio/mp3')) {
        source.type = 'audio/mp3';
        source.src = `../data/sounds/${filename}.mp3`;
    }
    audio.volume = 1;

    audio.appendChild(source);

    return audio;
}

function handleMessage(request, sender, sendResponse) {
    console.log(`A content script sent a message: ${request.message}`);

    console.log(request);
    let data = [];

    switch (request.message) {
        case "GET":
            sendResponse({
                response: `GET`,
                currentVolumes: volumes
            });
            break;

        case "SET":
            let newVolumes = request.newVolumes;
            break;

        case "TEST":
            console.log("THIS IS A TEST");
            break;

        default:
            console.log();
            sendResponse({ error: "Background does not know about this request." });
            break;
    }
    // data = [JSON.parse(JSON.stringify(keysDown)), movedBack];

    sendResponse({ response: "lamao" });
}

browser.runtime.onMessage.addListener(handleMessage);
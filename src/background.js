// 'use strict';

// With background scripts you can communicate with popup
// and contentScript files.
// For more information on background script,
// See https://developer.chrome.com/extensions/background_pages

function setItem() {
    console.log("OK");
}

function onError(error) {
    console.log(error);
}

console.clear();
// console.log(`STARTUP`);

createOpen();
createClosed();

let volumes;

async function setVolumes(newVolumes) {
    await browser.storage.sync
        .set({
            volumes: newVolumes,
        })
        .then(getVolumes, onError);
}

async function getVolumes() {
    volumes = (await browser.storage.sync.get("volumes"))["volumes"];

    // console.log(`New volumes: ${volumes.open} | ${volumes.close}`);
}

getVolumes().then(
    () => {
        return;
    },
    () => {
        if (volumes === undefined) {
            setVolumes({
                open: 50,
                close: 50,
            });
        }
    }
);

// console.log(volumes);

function createOpen() {
    let audio = getAudio("open");

    browser.tabs.onCreated.addListener((tab) => {
        let temp = audio.cloneNode(true);
        temp.volume = volumes.open / 100;
        temp.play();
    });
}

function createClosed() {
    let audio = getAudio("close");

    // *When windows & tabs close
    browser.windows.onRemoved.addListener((window) => {
        // console.log(`Closed window: ${window.id}`);
        // audio.cloneNode(true).play();
    });

    browser.tabs.onRemoved.addListener((tab) => {
        console.log(`Closed tab`);
        let temp = audio.cloneNode(true);
        temp.volume = volumes.close / 100;
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

function createKeydown() {}

function getAudio(filename) {
    let audio = document.createElement("audio");

    let source = document.createElement("source");

    if (audio.canPlayType("audio/mp3")) {
        source.type = "audio/mp3";
        source.src = `../data/sounds/${filename}.mp3`;
    }
    audio.volume = 1;

    audio.appendChild(source);

    return audio;
}

function handleMessage(request, sender, sendResponse) {
    console.log(`A content script sent a message: ${request.message}`);

    console.log(request);

    switch (request.message) {
        case "GET":
            sendResponse({
                response: `GET`,
                currentVolumes: volumes,
            });
            break;

        case "SAVE":
            let newVolumes = request.newVolumes;
            setVolumes(newVolumes);
            sendResponse({
                response: `SUCCESS`,
            });
            break;

        default:
            console.log();
            sendResponse({
                error: "Background does not know about this request.",
            });
            break;
    }
}

browser.runtime.onMessage.addListener(handleMessage);

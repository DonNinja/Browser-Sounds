let defaultVolumes = {
    open: 0,
    close: 0,
};

const openSlider = document.getElementById("openSlider");
const closeSlider = document.getElementById("closeSlider");
const openInput = document.getElementById("openInput");
const closeInput = document.getElementById("closeInput");
const volumeForm = document.getElementById("volumeForm");

function resetVolume() {
    const sending = browser.runtime.sendMessage({
        message: "GET",
    });
    sending.then(handleResponse, handleError);
}

function handleResponse(message) {
    console.log(`Message from the background script: ${message.response}`);
    if (message.response === "GET") {
        defaultVolumes = message.currentVolumes;

        openSlider.value = defaultVolumes.open;
        openInput.value = defaultVolumes.open;

        closeSlider.value = defaultVolumes.close;
        closeInput.value = defaultVolumes.close;

    } else if (message.response === "SUCCESS") {
        console.log(`Successful submit :)`);
    }
}

function handleError(error) {
    console.log(`Error: ${error}`);
}

/**
 * There was an error executing the script.
 * Display the popup's error message, and hide the normal UI.
 */
function reportExecuteScriptError(error) {
    document.querySelector("#popup-content").classList.add("hidden");
    document.querySelector("#error-content").classList.remove("hidden");
    console.error(`Failed to execute beastify content script: ${error.message}`);
}

// Keep the sliders and inputs in sync
openSlider.addEventListener("input", (e) => {
    openInput.value = openSlider.value;
});

closeSlider.addEventListener("input", (e) => {
    closeInput.value = closeSlider.value;
});

openInput.addEventListener("input", () => {
    openSlider.value = openInput.value;
});

closeInput.addEventListener("input", () => {
    closeSlider.value = closeInput.value;
});

openInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
    }
});

volumeForm.addEventListener("reset", (event) => {
    event.preventDefault();
    console.log("Sending reset to background");
    resetVolume();
});

volumeForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let newOpen = openSlider.value;
    let newClose = closeSlider.value;

    console.log(`Sending new values to background`);
    const sending = browser.runtime.sendMessage({
        message: "SAVE",
        newVolumes: { open: newOpen, close: newClose },
    });

    sending.then(handleResponse, handleError);
});

resetVolume();

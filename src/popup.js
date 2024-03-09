let defaultVolumes = {
    open: 0.5,
    close: 0.5,
};

const openSlider = document.getElementById("OpenSlider");
const closeSlider = document.getElementById("CloseSlider");
const openValue = document.getElementById("OpenValue");
const closeValue = document.getElementById("CloseValue");


function listenForClicks() {
    document.addEventListener("click", (e) => {
        /**
         * Remove the page-hiding CSS from the active tab,
         * send a "reset" message to the content script in the active tab.
         */
        function reset(tabs) { }

        /**
         * Just log the error to the console.
         */
        function reportError(error) {
            console.error(`Perform: ${error}`);
        }

        if (e.target.tagName !== "BUTTON" || !e.target.closest("#popupContent")) {
            // Ignore when click is not on a button within <div id="popupContent">.
            return;
        }

        if (e.target.type === "reset") {
            const sending = browser.runtime.sendMessage({
                message: "GET",
            });
            sending.then(handleResponse, handleError);
        } else if (e.target.type === "save") {
            const sending = browser.runtime.sendMessage({
                message: "SAVE",
            });
            sending.then(handleResponse, handleError);
        } else {
            // browser.tabs
            //     .catch(reportError);
        }
    });
}

function handleResponse(message) {
    console.log(`Message from the background script: ${message.response}`);
    if (message.response == "GET") {
        defaultVolumes = message.currentVolumes;

        console.log(defaultVolumes);

        openSlider.value = defaultVolumes.open;
        openValue.innerHTML = defaultVolumes.open;

        closeSlider.value = defaultVolumes.close;
        closeValue.innerHTML = defaultVolumes.close;
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

/**
 * When the popup loads, inject a content script into the active tab,
 * and add a click handler.
 * If we couldn't inject the script, handle the error.
 */

listenForClicks();

openSlider.addEventListener("input", (e) => {
    openValue.innerHTML = openSlider.value;
});

closeSlider.addEventListener("input", (e) => {
    closeValue.innerHTML = closeSlider.value;
});
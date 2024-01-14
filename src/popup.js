let defaultVolumes = {
    'open': .5,
    'close': .5
};

function initialise() {
    
}

function listenForClicks() {
    document.addEventListener("click", (e) => {
        /**
         * Remove the page-hiding CSS from the active tab,
         * send a "reset" message to the content script in the active tab.
         */
        function reset(tabs) {

        }

        /**
         * Just log the error to the console.
         */
        function reportError(error) {
            console.error(`Perform: ${error}`);
        }

        /**
         * Get the active tab,
         * then call "beastify()" or "reset()" as appropriate.
         */
        if (e.target.tagName !== "BUTTON" || !e.target.closest("#popupContent")) {
            // Ignore when click is not on a button within <div id="popup-content">.
            return;
        }
        if (e.target.type === "reset") {
            const sending = browser.runtime.sendMessage({
                message: "TEST",
            });
            sending.then(handleResponse, handleError);
            document.getElementById("test").textContent = "TEST";
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
// browser.tabs.listenForClicks
//     .catch(reportExecuteScriptError);

initialise();

listenForClicks();
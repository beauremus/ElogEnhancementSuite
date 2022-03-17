let encstat = document.querySelector('input[name="encStat"]');

let gettingItem = browser.storage.local.get();
gettingItem.then(setPrevState, onError);

encstat.addEventListener('change',updateSelection,false);

function updateSelection(event) {
    let encstatSelected = event.target.checked;

    let setting = browser.storage.local.set({
        encstat: {selected:encstatSelected}
    });

    setting.then(onGot,onError);

    if (encstatSelected) {
        browser.tabs.executeScript(
            null,
            {file: "/encstat.js"}
        );
    } else {
        browser.tabs.reload();
        window.close();

        return;
    }
}

function setPrevState(state) {
    console.log(state);
    encstat.checked = state.selected;
}

/* generic Got handler */
function onGot(item) {
  console.log(item);
}

/* generic error handler */
function onError(error) {
    console.log(error);
}

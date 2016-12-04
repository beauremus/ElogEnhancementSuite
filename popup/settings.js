let encstat = document.querySelector('input[name="encStat"]');

encstat.addEventListener('change',updateSelection,false);

function updateSelection(event) {
    let encstatSelected = event.target.checked;

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

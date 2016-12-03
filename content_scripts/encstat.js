/* These are valid enclosures */
const LOGS = ['Booster','Linac','Main Injector','Muon','Recycler'];
const CATS = ['8 GeV line','BNB','Meson Center','Meson Test','MTA','Neutrino Muon','NuMI','Switchyard'];

if (document.location.pathname === "/Elog/add/entry") {
    document.body.style.background = "blue";

    let encstat = document.createElement('div'); // container
    encstat.className = 'column2';

    let encstatLabel = document.createElement('label');
    encstatLabel.textContent = 'Enclosure Status';

    let encstatNoAccess = document.createElement('input');
    encstatNoAccess.type = 'radio';
    encstatNoAccess.value = 'NoAccess';
    encstatNoAccess.name = 'access';

    let encstatNoAccessText = document.createElement('span');
    encstatNoAccessText.textContent = 'No Access';

    let encstatCtrl = document.createElement('input');
    encstatCtrl.type = 'radio';
    encstatCtrl.value = 'CtrlAccess';
    encstatCtrl.name = 'access';

    let encstatCtrlText = document.createElement('span');
    encstatCtrlText.textContent = 'Controlled Access';

    let encstatSuper = document.createElement('input');
    encstatSuper.type = 'radio';
    encstatSuper.value = 'SuperAccess';
    encstatSuper.name = 'access';

    let encstatSuperText = document.createElement('span');
    encstatSuperText.textContent = 'Supervised Access';

    encstat.appendChild(encstatLabel);
    encstat.appendChild(encstatNoAccess);
    encstat.appendChild(encstatNoAccessText);
    encstat.appendChild(encstatCtrl);
    encstat.appendChild(encstatCtrlText);
    encstat.appendChild(encstatSuper);
    encstat.appendChild(encstatSuperText);

    let tags = document.querySelector('.tags'),
        form = document.querySelectorAll('form')[1];

    tags.className = 'column2 tags';

    tags.parentNode.appendChild(encstat); // Wait to append to DOM last
    form.addEventListener('submit',listen,false); // Form submit listener
}

function listen() {
    let access = document.querySelector('input[type="radio"]:checked');

    if (access) { // Validate access type is selected
        let accessValue = access.value,
            logs = document.querySelectorAll('.logs ul li span.item'),
            cats = document.querySelectorAll('.categories ul li span.item'),
            selectedEncs = [];

        for (log of logs) {
            let logText = log.textContent;

            if (LOGS.includes(logText)) {
                selectedEncs.push(logText);
            }

            if (logText === 'External Beamlines') {
                for (cat of cats) {
                    let catText = cat.textContent;

                    if (CATS.includes(catText)) {
                        selectedEncs.push(catText);
                    }
                }
            }
        }

        if (selectedEncs.length > 0) { // Validate enclosures selected
            // TODO: Call enclsoure status updater method
            console.log(`${selectedEncs} enclosures are selected.`);

            console.log(`${accessValue} access type is selected.`);
        }
    }
}

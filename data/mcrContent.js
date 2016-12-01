self.port.on("replacePage", function() {
    var chxBoxDiv = document.querySelector('.tags').parentNode,
        isEntry = window.location.pathname === '/Elog/add/entry',
        isComment = window.location.pathname === '/Elog/add/comment';

    if (chxBoxDiv != undefined) {
        if (isEntry) {
            chxBoxDiv.appendChild(createAccess('checkbox'));
        } else if (isComment) {
            chxBoxDiv.appendChild(createAccess('checkbox'));
        }
    }
});

function createAccess(inputType) {
    var access = document.createElement('div');

    access.setAttribute("id", "access");

    if (inputType === 'button') {
        access.innerHTML = '<label>Access</label><button name="isCtrld">Controlled</button><button name="isSuper">Supervised</button>';
    } else if (inputType === 'checkbox') {
        access.innerHTML = '<label>Access</label><input type="checkbox" name="isCtrld">Controlled<input type="checkbox" name="isSuper">Supervised';
    } else {
        access.innerHTML = '';
    }

    return access;
}

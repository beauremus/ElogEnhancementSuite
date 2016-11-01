const MACHINES = ['Linac', 'Booster', 'Main Injector'];
const BEAMLINES = ['BNB', 'Meson Center', 'Meson Test', 'Neutrino Muon', 'NuMI', '8 GeV line'];

self.port.on("replacePage", function() {
    var submit = document.querySelector('input[type=submit]');

    submit.addEventListener("click", getAccess, false);
});

function getAccess(event) {
    var isCtrldAccess = document.getElementsByName('isCtrld')[0].checked,
        isSuperAccess = document.getElementsByName('isSuper')[0].checked;

    if (isCtrldAccess && isSuperAccess) {
        alert("ERROR: Selected both controlled and supervised access. This is not a valid state.");
    } else if (isCtrldAccess || isSuperAccess) {
        var logs = document.querySelector('.logs').querySelectorAll('.item'),
            categories = document.querySelector('.categories').querySelectorAll('.item');

        alert("ACCESS!!!");

        for (const log in logs) {
            if (MACHINES.includes(log)) {
                postChange(log);
            } else if (log === 'External Beamlines') {
                for (var beamline in BEAMLINES) {
                    if (BEAMLINES.includes(beamline)) {
                        postChange(beamline);
                    }
                }
            }
        }
    }
}

function postChange(encName, statName) {
    let encJsonArray = fetchEncStat(getAllEnclosures),
        statJsonArray = fetchEncStat(getAllStatuses),
        encId = findId(encJsonArray, encName),
        statId = findId(statJsonArray, statName);

    let data = new FormData();
    data.append('text',`enclosureID=${encId}&statusID=${statId}`);

    fetch('https://www-bd.fnal.gov/EnclosureStatus/addEntry',
        {
            method: "POST",
            body: data
        }
    )
    .then((res) => res.json())
    .then((data) => console.log(JSON.stringify(data)));
}

function findId(array, match) {
    array.find(function(object) {
        if (object.name === match) {
            return object.id;
        }
    });
}

function fetchEncStat(query) {
    // Reasonable query values inclue:
    // getAllEnclosures, getAllStatuses, getAllEntries
    let url = `https://www-bd.fnal.gov/EnclosureStatus/${query}`;

    fetch(url)
      .then(function(response){
          if (!response.ok) {
              console.log('ERROR: Response not OK');
              return null;
          }
          response.json()
            .then(function(json){
                return json;
            })
      });
}

// $.ajax(
// {
//   type: 'POST',
//   url: 'http://www-bd.fnal.gov/EnclosureStatus/addEntry',
//   async: true,
//   dataType: 'text',
//   data: 'enclosureID='+enclosureID+'&statusID='+statusID,
//   success: function(text)
//   {
//     alert(text);
//   },
//   error: function(response)
//   {
//     alert(response.responseText);
//   }
// });

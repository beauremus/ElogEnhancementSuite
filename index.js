var pageMod = require("sdk/page-mod");
var self = require("sdk/self");

pageMod.PageMod({
    // https://www-bd.fnal.gov/Elog/*
    // https://animal.fnal.gov/Elog/*
    include: ["https://www-bd.fnal.gov/Elog/*","https://animal.fnal.gov/Elog/*","https://www-bdtest.fnal.gov/Elog/*"],
    contentScriptFile: ['./mcrContent.js','./mcrEvents.js'],
    contentStyleFile: './mcrStyle.css',
    // Send the content script a message inside onAttach
    onAttach: function(worker) {
      worker.port.emit("replacePage");
    }
});

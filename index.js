var pageMod = require("sdk/page-mod");
var self = require("sdk/self");

pageMod.PageMod({
    include: "https://www-bd.fnal.gov/Elog/*",
    // https://www-bd.fnal.gov/Elog/add/entry/*
    contentScriptFile: ['./mcrContent.js','./mcrEvents.js'],
    contentStyleFile: './mcrStyle.css',
    // Send the content script a message inside onAttach
    onAttach: function(worker) {
      worker.port.emit("replacePage");
    }
});

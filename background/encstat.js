// browser.runtime.onMessage.addListener(request => {
//     if (request.on) {
//         document.body.style.background = "blue";
//     } else {
//         document.body.style.background = "red";
//     }
// });

"use strict";

browser.runtime.onMessage.addListener(request => {
  console.log("Message from the background script:");
  console.log(request.greeting);
  return Promise.resolve({response: "Hi from content script"});
});

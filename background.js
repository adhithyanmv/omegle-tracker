let color = "#3aa757";

// chrome.runtime.onInstalled.addListener(() => {
//   // chrome.storage.sync.set({ color });
// });

// chrome.storage.onMessage.addListener(function (request, sender, sendResponse) {
//   console.log(request);
// });

chrome.storage.onChanged.addListener(function (changes, areaName) {
  console.log(changes);
});

chrome.runtime.onInstalled.addListener(() => {
  console.log("LinkedIn AI Reply Assistant installed");
});

/* Keep background worker alive and support persistent windows */
chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  if (req.action === "OPEN_PANEL") {
    chrome.windows.create({
      url: chrome.runtime.getURL('panel.html'),
      type: 'popup',
      width: 450,
      height: 680
    }, (win) => {
      sendResponse({ success: true, windowId: win?.id });
    });
    return true; // Keep listener alive for async response
  }
});

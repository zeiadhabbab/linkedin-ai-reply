function getActivePostContainer() {
  const editor = document.querySelector(
    'div[contenteditable="true"][role="textbox"]:focus'
  );
  if (!editor) return null;
  return editor.closest("article, div[data-urn]");
}

function extractPostText(container) {
  if (!container) return "";

  const selectors = [
    'span[dir="ltr"]',
    'span[dir="rtl"]',
    '.feed-shared-update-v2__description',
    '.update-components-text'
  ];

  for (const sel of selectors) {
    const nodes = container.querySelectorAll(sel);
    if (nodes.length) {
      const text = Array.from(nodes).map(n => n.innerText).join("\n").trim();
      if (text.length > 30) return text;
    }
  }
  return "";
}

function pasteReply(text) {
  const box = document.querySelector(
    'div[contenteditable="true"][role="textbox"]:focus'
  );
  if (!box) {
    alert("Click the comment box first.");
    return;
  }
  box.focus();
  document.execCommand("selectAll", false);
  document.execCommand("delete", false);
  document.execCommand("insertText", false, text);
}

chrome.runtime.onMessage.addListener((req, _, sendResponse) => {
  if (req.action === "GET_POST_TEXT") {
    const text = extractPostText(getActivePostContainer());
    sendResponse({ text });
  }

  if (req.action === "PASTE_REPLY") {
    pasteReply(req.text);
  }
});

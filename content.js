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

chrome.runtime.onMessage.addListener((req, _, sendResponse) => {
  if (req.action === "GET_POST_TEXT") {
    const text = extractPostText(getActivePostContainer());
    sendResponse({ text });
  }
});

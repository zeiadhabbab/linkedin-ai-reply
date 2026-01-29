const apiKeyInput = document.getElementById("apiKey");
const saveKeyBtn = document.getElementById("saveKey");
const keyStatus = document.getElementById("keyStatus");
const generateBtn = document.getElementById("generate");
const pasteBtn = document.getElementById("pasteBtn");
const closeBtn = document.getElementById("closeBtn");
const output = document.getElementById("output");

/* Load API Key */
chrome.storage.local.get(["openai_api_key"], res => {
  if (res.openai_api_key) keyStatus.textContent = "✅ API Key saved";
});

/* Save API Key */
saveKeyBtn.onclick = () => {
  const key = apiKeyInput.value.trim();
  if (!key.startsWith("sk-")) {
    keyStatus.textContent = "❌ Invalid API key";
    return;
  }
  chrome.storage.local.set({ openai_api_key: key }, () => {
    apiKeyInput.value = "";
    keyStatus.textContent = "✅ API Key saved";
  });
};

function detectLang(text) {
  return /[\u0600-\u06FF]/.test(text) ? "ar" : "en";
}

function buildPrompt(text, tone, customRules = "") {
  const lang = detectLang(text);
  const rulesText = customRules.trim() ? `\nCustom rules:\n${customRules}` : "";
  if (lang === "ar") {
    return {
      system: `\nأنت تكتب تعليقًا احترافيًا على لينكدإن.\nالنبرة: ${tone}\nRules:\n- أسلوب بشري طبيعي\n- جملتان إلى ثلاث\n- بدون هاشتاغ\n- بدون إيموجي إلا إذا كانت النبرة ودية${rulesText}\n`,
      user: text
    };
  }

  return {
    system: `\nYou write LinkedIn comments.\nTone: ${tone}\nRules:\n- Human and natural\n- 2–3 sentences\n- No hashtags\n- No emojis unless friendly${rulesText}\n`,
    user: text
  };
}

async function callOpenAI(apiKey, prompt) {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: prompt.system },
        { role: "user", content: prompt.user }
      ],
      temperature: 0.7
    })
  });

  const data = await res.json();
  return data.choices?.[0]?.message?.content || "Error generating reply.";
}

generateBtn.onclick = async () => {
  chrome.storage.local.get(["openai_api_key"], async res => {
    if (!res.openai_api_key) {
      output.value = "❌ Please save your OpenAI API key first.";
      return;
    }

    const postContent = document.getElementById("postContent").value.trim();
    if (!postContent) {
      output.value = "❌ Please paste the LinkedIn post/comment content first.";
      return;
    }

    output.value = "⏳ Generating your reply...";
    const customRules = document.getElementById("customRules").value;
    const prompt = buildPrompt(postContent, document.getElementById("tone").value, customRules);
    const reply = await callOpenAI(res.openai_api_key, prompt);
    output.value = reply;
  });
};

pasteBtn.onclick = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "PASTE_REPLY", text: output.value });
  });
};

closeBtn.onclick = () => {
  window.close();
};

/* Prevent accidental focus loss from closing panel */
window.addEventListener('beforeunload', (e) => {
  // Allow close only from explicit button click
});

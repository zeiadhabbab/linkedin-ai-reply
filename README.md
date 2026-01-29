# LinkedIn AI Reply Assistant

A Chrome extension that generates AI-powered replies to LinkedIn posts in both **English and Arabic**, using OpenAI's API.

## Features

✅ **AI-Generated Replies** — Uses GPT-4 Mini to write contextual, tone-aware comments  
✅ **Bilingual Support** — Auto-detects Arabic/English and responds in the same language  
✅ **Tone Control** — Professional, Friendly, Supportive, Technical, or Short & Smart  
✅ **Persistent Panel** — Keep the reply generator open while interacting with LinkedIn  
✅ **Auto-Paste** — Generated replies paste directly into the comment box  
✅ **Secure** — API key stored locally in browser storage  

## Installation

1. **Get your OpenAI API key** from [platform.openai.com](https://platform.openai.com)
2. **Load the extension:**
   - Open `chrome://extensions/`
   - Enable "Developer mode" (top-right toggle)
   - Click "Load unpacked"
   - Select this folder
3. **Configure the extension:**
   - Click the extension icon in your toolbar
   - Paste your OpenAI API key
   - Click "Save API Key"

## Usage

### Quick Reply (Popup)
1. Click the extension icon
2. Select a tone (Professional, Friendly, etc.)
3. Click "Generate & Paste" → auto-pastes to the focused comment box

### Persistent Panel (Recommended)
1. Click "Open in window" → keeps the panel open while you browse LinkedIn
2. Click on a LinkedIn post/comment to focus it
3. Click "Get Selection" to grab the post text
4. Select a tone and click "Generate"
5. Click "Paste into comment" to insert your reply

## File Structure

```
├── manifest.json          # Extension config
├── popup.html             # Quick access popup UI
├── popup.js               # Popup event handlers
├── panel.html             # Persistent panel UI
├── panel.js               # Panel logic + OpenAI integration
├── content.js             # Injects into LinkedIn pages
├── background.js          # Service worker (opens persistent windows)
├── styles.css             # Shared styling
└── icon.png              # Extension icon
```

## Configuration

### Supported Tones
- **Professional** — Business-like, courteous
- **Friendly** — Warm, approachable
- **Supportive** — Encouraging, empathetic
- **Technical** — Detailed, knowledgeable
- **Short & Smart** — Concise, impactful

### API Model
Uses `gpt-4.1-mini` for fast, cost-effective replies. Change in `popup.js` or `panel.js` if you prefer:
- `gpt-4` — More capable
- `gpt-3.5-turbo` — Faster & cheaper

## Troubleshooting

### Panel won't stay open?
- Make sure you clicked "Open in window" (not the popup icon)
- Check `chrome://extensions/` — extension should be enabled

### Paste not working?
- Click directly into the LinkedIn comment box first
- Then use "Paste into comment" or "Generate & Paste"

### API key errors?
- Verify your key starts with `sk-`
- Check your OpenAI account has API credits
- Paste a fresh key if it's been used elsewhere

## Privacy & Security

- ✅ API key stored **only** in your local browser (`chrome.storage.local`)
- ✅ No data sent to external servers except OpenAI
- ✅ No analytics or telemetry
- ✅ Each message goes directly to OpenAI's API

## License

MIT

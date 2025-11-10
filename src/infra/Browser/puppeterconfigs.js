const os = require('os')
const crypto = require('crypto')
const path = require('path')
const extensionPath = path.join(process.cwd(), "extensions", "capsolver");


// medidas de precaução de detecção de automação.

module.exports = function launchConfig() {
  return {
  
    headless: false,

    // Simula comportamento mais humano
    slowMo: randomInt(10, 40),

    // Importantíssimo: remove rastros do Puppeteer
    ignoreDefaultArgs: [
      '--enable-automation',
      '--enable-blink-features=IdleDetection',
    ],

    args: [
     `--disable-extensions-except=${extensionPath}`,
      `--load-extension=${path}`,
      '--no-sandbox',
      '--disable-setuid-sandbox',

      // Evita fingerprints óbvias
      '--disable-blink-features=AutomationControlled',
      '--disable-infobars',

      
      `--user-agent=${randomUA()}`,
      `--lang=pt-BR,pt`,
      '--window-position=0,0',

      ...randomViewportArgs(),

 
      '--disable-dev-shm-usage',
      '--disable-features=IsolateOrigins,site-per-process',


      '--metrics-recording-only',
      '--disable-default-apps',

  
      '--enable-gpu',
      '--use-gl=desktop',
    ],

    defaultViewport: null, // necessário para fullscreen size
  }
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomUA() {
  const uas = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0 Safari/537.36",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17 Safari/605.1.15",
    "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36"
  ]
  return uas[Math.floor(Math.random() * uas.length)]
}

// Lista realista de resoluções de uso comum
function randomViewportArgs() {
  const viewports = [
    [1366, 768],
    [1440, 900],
    [1536, 864],
    [1600, 900],
    [1920, 1080],
  ]

  const [w, h] = viewports[Math.floor(Math.random() * viewports.length)]
  return [`--window-size=${w},${h}`]
}

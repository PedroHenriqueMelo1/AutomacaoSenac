const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')


module.exports = class BrowserClient {
  constructor(configs) {
    this.configs = configs
    this.browser = null
    this.page = null
  }

  async launch() {
    try {
      puppeteer.use(StealthPlugin())
      this.browser = await puppeteer.launch(this.configs)
      console.log('Navegador aberto com sucesso.')
    } catch (e) {
      throw new Error("INFRA_ERROR: Failed to launch browser → " + e.message)
    }
  }

  

  async newPage() {
    try {
     if(this.page) await this.page.close()

      this.page = await this.browser.newPage()
      return this.page
    } catch (e) {
      throw new Error("INFRA_ERROR: Failed to create new page → " + e.message)
    }
  }

 
  async goto(url) {
    try {
      await this.page.goto(url, { waitUntil: 'networkidle0' })
    } catch (e) {
      throw new Error("INFRA_ERROR: Failed to navigate → " + e.message)
    }
  }

  async ClickElemmentLocator(selector) {
  try {
   await this.page.locator(selector).click()
  } catch (e) {
    throw new Error("INFRA_ERROR: Failed to click → " + e.message)
  }
}

async ClickElemment(selector) {

  try {
  
    await this.page.click(selector)

  }
  catch(e) {
    throw new Error("INFRA_ERROR Failed to click -> " + e.message)
  }
}

async TypeElement(selector, text) {
  try {
    if (!selector || typeof selector !== "string") {
      throw new Error("Selector inválido")
    }

    await this.page.waitForSelector(selector, { timeout: 8000 })
    await this.page.type(selector, text, { delay: 20 })

  } catch (e) {
    throw new Error("INFRA_ERROR: Failed to type → " + e.message)
  }
}

async CheckNetworkRequests() {
  return new Promise((resolve) => {

    const handler = (req) => {
      if (req.url().includes('clr')) {
        this.page.off('request', handler);
        resolve(true);
      }
    };

    this.page.on('request', handler);
  });
}

async CheckboxElement(selector) {
  try {

    if (!selector || typeof selector !== "string") {
      throw new Error("Selector inválido")
    }

    await this.page.waitForSelector(selector, { timeout: 8000 })

    const isChecked = await this.page.$eval(selector, el => el.checked)

    if (!isChecked) {
      await this.page.click(selector)
    }

  } catch (e) {
    throw new Error("INFRA_ERROR: Failed to toggle checkbox → " + e.message)
  }
}

async CheckState(selector) {
  await this.page.waitForFunction((id) => {
    const btn = document.getElementById(id);
    if (!btn) return false;

    try {
      // Tenta clickar programaticamente
      btn.click();

      // Verifica se algum listener bloqueou (preventDefault / stopPropagation)
      const e = new MouseEvent("click", { bubbles: true, cancelable: true });
      const canceled = !btn.dispatchEvent(e);

      return !canceled;
    } catch (err) {
      return false;
    }
  }, {}, selector);
}


async ResolveCaptcha(selectorValue1, selectorValue2, selectorTargetInput) {
  try {
    // garantir que todos seletores existam
    await this.page.waitForSelector(selectorValue1, { timeout: 8000 })
    await this.page.waitForSelector(selectorValue2, { timeout: 8000 })
    await this.page.waitForSelector(selectorTargetInput, { timeout: 8000 })

    // pegar os valores no DOM
    const [raw1, raw2] = await this.page.evaluate((s1, s2) => {
      const el1 = document.querySelector(s1)
      const el2 = document.querySelector(s2)

      const v1 = el1 ? (el1.textContent || el1.value || '').trim() : ''
      const v2 = el2 ? (el2.textContent || el2.value || '').trim() : ''

      return [v1, v2]
    }, selectorValue1, selectorValue2)

    // converter para número
    const num1 = Number(raw1)
    const num2 = Number(raw2)

    if (isNaN(num1) || isNaN(num2)) {
      throw new Error(`Valores inválidos: '${raw1}' e '${raw2}'`)
    }

    // cálculo (pode ser trocado depois)
    const result = num1 + num2

    // preencher input destino
    await this.page.focus(selectorTargetInput)
    await this.page.click(selectorTargetInput, { clickCount: 3 })
    await this.page.type(selectorTargetInput, String(result))

    return result

  } catch (e) {
    throw new Error("INFRA_ERROR: Failed to resolve captcha → " + e.message)
  }
}

async verifyURL() {

  try {
    const URL = await this.browser.URL()
    console.log(URL)
  }
  catch(err) {

  }
}

 async close() {
  if (!this.browser) return;

  try {
    // Fecha todas as páginas para evitar deadlock
    const pages = await this.browser.pages();
    for (const p of pages) {
      try {
        await p.close({ runBeforeUnload: false });
      } catch {}
    }
  } catch {}

  try {
    // Tenta fechar o navegador normalmente
    await this.browser.close({ runBeforeUnload: false });
  } catch {
    // Se travar, mata o processo real do Chrome
    try {
      const proc = this.browser.process();
      if (proc) proc.kill('SIGKILL');
    } catch {}
  }

  this.browser = null;
}

}

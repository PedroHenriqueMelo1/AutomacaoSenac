const puppeteer = require('puppeteer')

module.exports = class BrowserClient {
  constructor(configs) {
    this.configs = configs
    this.browser = null
    this.page = null
  }

  async launch() {
    try {
      this.browser = await puppeteer.launch(this.configs)
      this.page = await this.browser.newPage()
      console.log('Navegador aberto com sucesso.')
    } catch (e) {
      throw new Error("INFRA_ERROR: Failed to launch browser → " + e.message)
    }
  }

  async newPage() {
    try {
      this.page = await this.browser.newPage()
      return this.page
    } catch (e) {
      throw new Error("INFRA_ERROR: Failed to create new page → " + e.message)
    }
  }

  async goto(url) {
    try {
      await this.page.goto(url, { waitUntil: 'networkidle2' })
    } catch (e) {
      throw new Error("INFRA_ERROR: Failed to navigate → " + e.message)
    }
  }

  async close() {
    if (!this.browser) return
    await this.browser.close()
  }
}



module.exports = class BrowserAdapter {

  constructor(browserclient) {
    this.BrowserClient = browserclient
  }

  async AbrirNavegador() {
    
    await this.BrowserClient.launch()
  
}

}


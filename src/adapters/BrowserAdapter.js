

module.exports = class BrowserAdapter {

  constructor(browserclient) {
    this.BrowserClient = browserclient
  }

  async AbrirNavegador() {
    
    await this.BrowserClient.launch()
  
}

async IrParaPagina(URL) {

  await this.BrowserClient.goto(URL)
}

async ClickSelector(seletor) {

  await this.BrowserClient.ClickElemment(seletor)
}

async PreencherInput(selector, text) {
  await this.BrowserClient.TypeElement(selector, text)
}

async PreencherCheckBox(selector) {
  await this.BrowserClient.CheckboxElement(selector)
}

async ResolverCaptch(seletor1,seletor2,seletor3) {
  await this.BrowserClient.ResolveCaptcha(seletor1,seletor2,seletor3)
}

async EspereQualquerOverlayParaClicar(seletor) {
  await this.BrowserClient.WaitUntilClickable(seletor)
}

async PageQualquerClick() {
  await this.BrowserClient.clickAny()
}

async VerificarRedeParaConcluir(selector) {

  await this.BrowserClient.CheckNetworkRequests()


}

}



class Orchestrator {
  constructor(browserAdapter) {
   this.browserAdapter = browserAdapter
  }

  async Cluster() {
    const browser =  await this.browserAdapter.AbrirNavegador()

      console.log(browser)

    console.log(browser)
    console.log('Teste')
  }
}


module.exports = Orchestrator
const sleep = require('./helper')
class Orchestrator {
  constructor(browserAdapter) {
   this.browserAdapter = browserAdapter
  }

  async Cluster() {
     await this.browserAdapter.AbrirNavegador()

    await this.browserAdapter.IrParaPagina('https://empreenda.digito1.com.br/VotoPopular/Voto/2341')

    await this.browserAdapter.ClickSelector('a[onclick="votacao(2341,\'Graduação\',\'CicloVivo\')"]')

   await this.browserAdapter.PreencherInput('#Email', "pha.melo16@gmail.com")
   
   await this.browserAdapter.PreencherCheckBox('#chkAceite')

   await this.browserAdapter.ResolverCaptch('#valor1', '#valor2', "#totalvalores")
 
    await sleep(3000)

    await this.browserAdapter.ClickSelector("#btEnviar")

 
    await this.browserAdapter.VerificarRedeParaConcluir()
  
    await sleep(2000)

   await this.browserAdapter.ClickSelector("#btEnviar")
  }
}


module.exports = Orchestrator
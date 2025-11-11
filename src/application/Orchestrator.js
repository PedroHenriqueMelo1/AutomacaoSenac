const sleep = require('./helper')
class Orchestrator {
  constructor(browserAdapter, firstTime) {
   this.browserAdapter = browserAdapter
   this.firstTime = null
  }

  async Cluster(DTO) {
    await this.browserAdapter.AbrirNavegador()
    
    await this.browserAdapter.IrParaPagina('https://empreenda.digito1.com.br/VotoPopular/Voto/777')

    await this.browserAdapter.ClickSelector('a[onclick="votacao(777,\'Ensino Médio Técnico\',\'Lebrai\')"]')

   await this.browserAdapter.PreencherInput('#Email',`${DTO.email}`)
   
   await this.browserAdapter.PreencherCheckBox('#chkAceite')

   await this.browserAdapter.ResolverCaptch('#valor1', '#valor2', "#totalvalores")
 
    await sleep(3000)

    await this.browserAdapter.ClickSelector("#btEnviar")

 
    await this.browserAdapter.VerificarRedeParaConcluir()
  
    await sleep(2000)

   await this.browserAdapter.ClickSelector("#btEnviar")

   await sleep(2500)


   await this.browserAdapter.FecharNavegador()

   return
  }
}


module.exports = Orchestrator
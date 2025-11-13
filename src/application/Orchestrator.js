const sleep = require('./helper')
class Orchestrator {
  constructor(browserAdapter, firstTime) {
   this.browserAdapter = browserAdapter
   this.firstTime = null
  }

  async Cluster(DTO) {
    if(!this.firstTime) {
          await this.browserAdapter.AbrirNavegador()
        console.log(`Abrindo navegador 1°VEZ`)
        this.firstTime = 1
    }
  
    
    await this.browserAdapter.IrParaPagina('https://empreenda.digito1.com.br/VotoPopular/Voto/777')

    await this.browserAdapter.ClickSelectorLocator('a[onclick="votacao(777,\'Ensino Médio Técnico\',\'Lebrai\')"]')

   await this.browserAdapter.PreencherInput('#Email',`${DTO.email}`)
    
   await this.browserAdapter.ResolverCaptch('#valor1', '#valor2', "#totalvalores")
  

   await sleep(7500)

 try {
    await this.browserAdapter.VerificarRedeParaConcluir()
  
    
   await this.browserAdapter.ClickElemment("#btEnviar")


 }
 catch(err) {
  console.log(err)
 }

   return
  }
}


module.exports = Orchestrator
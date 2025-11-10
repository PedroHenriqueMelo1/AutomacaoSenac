 const OrchestratorAutomation = require('./application/OrchestratorFactory')

 console.log('teste')

 async function IndexApp() {

  console.log('Estou sendochamado 1?')

await OrchestratorAutomation.Cluster()

   console.log('estou sendo chamado?')
 }

IndexApp()



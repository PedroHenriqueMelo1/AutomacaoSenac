 const OrchestratorAutomation = require('./application/OrchestratorFactory')
const XLSX = require('./adapters/EmailAdapter')


async function IndexApp() {
  try {
    const Data = await XLSX.PegarEmail();
    await OrchestratorAutomation.Cluster(Data);
    await XLSX.GravarLog(Data.email, true)
    
  } catch (err) {
    console.error("Erro no ciclo:", err.message);
    // continua o loop mesmo assim
    await XLSX.GravarLog('Erro', false)
  }
}

async function startLoop() {
  while (true) {
    await IndexApp();

    // opcional: pequena pausa para evitar loop agressivo
    await new Promise(res => setTimeout(res, 1500));
  }
}

startLoop();

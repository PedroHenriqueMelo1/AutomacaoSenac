const Orchestrator = require("./Orchestrator");
const BrowserAdapter = require('../adapters/BrowserAdapter')
const BrowserClient = require('../infra/Browser/BrowserClient')
const configs = require('../infra/Browser/puppeterconfigs')



const OrchestratorFactory = () => {

  return new Orchestrator(new BrowserAdapter(new BrowserClient(configs())))
}

module.exports = OrchestratorFactory()
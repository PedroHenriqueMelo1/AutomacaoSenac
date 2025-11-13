const EmailClient = require('../repository/RepositoryClient')

class EmailAdapter {

  constructor(emailclient) {
    this.emailclient = emailclient
  }

  async PegarEmail() {
  const Email = await  this.emailclient.getRandomEmail()

  return Email
  }

  async GravarLog(email, boolean) {

    

     await this.emailclient.gravarLog(email, boolean)

    return 'Ok'
  }
}


 module.exports = new EmailAdapter(new EmailClient())




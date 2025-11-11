const Excel = require('exceljs');
const path = require('path');



  class ExcelClient {
    constructor() {
      this.filePath = path.resolve(__dirname, 'emails.xlsx')
       this.logPath = path.resolve(__dirname, 'log.xlsx');
    }

  async getRandomEmail() {
     const workbook = new Excel.Workbook();
  await workbook.xlsx.readFile(this.filePath);

  const sheet = workbook.getWorksheet(1);

  const rows = [];

  sheet.eachRow((row, number) => {
    const email = row.getCell(1).value;
    const ciclos = Number(row.getCell(2).value || 0);

    if (!email) return;

    // Ignora emails com 30 ciclos ou mais
    if (ciclos >= 30) return;

    rows.push({ rowNumber: number, email, ciclos });
  });

  if (rows.length === 0) {
    throw new Error("Nenhum email disponível (todos >= 30 ciclos).");
  }

  // Seleciona aleatório
  const random = rows[Math.floor(Math.random() * rows.length)];

  const newCount = random.ciclos + 1;

  const targetRow = sheet.getRow(random.rowNumber);
  targetRow.getCell(2).value = newCount;
  targetRow.commit();

  await workbook.xlsx.writeFile(this.filePath);

  return {
    email: random.email,
    ciclos: newCount
  };
  }

async gravarLog(email, status) {
    const workbook = new Excel.Workbook();

    // Tenta ler o arquivo. Se não existir, cria com header.
    try {
      await workbook.xlsx.readFile(this.logPath);
    } catch (err) {
      // Arquivo não existe → criar um novo
      const sheet = workbook.addWorksheet('Log');
      sheet.addRow(["Email", "Hora", "Status"]);
    }

    const sheet = workbook.getWorksheet(1);

    const hora = new Date().toISOString();
    const feedback = status === true ? "sucesso" : "falha";

    sheet.addRow([email, hora, feedback]);

    await workbook.xlsx.writeFile(this.logPath);
  }

  }


module.exports = ExcelClient;

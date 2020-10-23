import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { Workbook, Worksheet } from 'exceljs'

@Injectable()
export class SpreadsheetService implements OnModuleInit {
    private currentSpreadsheet: Worksheet;

    async onModuleInit(): Promise<void> {
        const res = await this.isSpreadsheetValid();
        Logger.log(res);
    }

    private async getSpreadsheet () {
        if (!this.currentSpreadsheet) {
            const workbook = new Workbook();
            const wb = await workbook.xlsx.readFile(__dirname + '/../Export.xlsx')
            this.currentSpreadsheet = wb.worksheets[0];
            return this.currentSpreadsheet;
        } else {
            return this.currentSpreadsheet;
        }
    }

    async isSpreadsheetValid(): Promise<boolean> {
        const spreadsheet = await this.getSpreadsheet();
        const verifications = []
        spreadsheet.getRow(1).eachCell((cell, colNumber) => {
            if (colNumber === 1 && cell.text === 'Nome Cliente')
                verifications.push(true)
            if (colNumber === 2 && cell.text === 'Situação Pedido')
                verifications.push(true)
            if (colNumber === 3 && cell.text === 'Nr. Pedido')
                verifications.push(true)
            if (colNumber === 4 && cell.text === 'Nr. Item')
                verifications.push(true)
            if (colNumber === 5 && cell.text === 'Cód. Pedido')
                verifications.push(true)
            if (colNumber === 6 && cell.text === 'Data Emissão')
                verifications.push(true)
            if (colNumber === 7 && cell.text === 'Nr OC Cliente')
                verifications.push(true)
            if (colNumber === 8 && cell.text === 'Nr. OC Cliente Item')
                verifications.push(true)
            if (colNumber === 9 && cell.text === 'Item Ped.')
                verifications.push(true)
            if (colNumber === 10 && cell.text === 'Código Prod/Serv')
                verifications.push(true) 
            if (colNumber === 11 && cell.text === 'Nome Prod/Serv')
                verifications.push(true)
            if (colNumber === 12 && cell.text === 'Quant. Solicitada')
                verifications.push(true)
            if (colNumber === 13 && cell.text === 'Quant. Liberada')
                verifications.push(true)
            if (colNumber === 14 && cell.text === 'Quant. Pendente')
                verifications.push(true)                
            if (colNumber === 15 && cell.text === 'Situação Item')
                verifications.push(true)
            if (colNumber === 16 && cell.text === 'Dt. Entrega Item')
                verifications.push(true)
            if (colNumber === 17 && cell.text === 'Dt. Pedido Compra')
                verifications.push(true)
            if (colNumber === 18 && cell.text === 'Nr. Doc Fatur Liber')
                verifications.push(true)
            if (colNumber === 19 && cell.text === 'Data Faturamento')
                verifications.push(true)
            if (colNumber === 20 && cell.text === 'Complement Prod/Serv')
                verifications.push(true)
            if (colNumber === 21 && cell.text === 'Info Plus  5')
                verifications.push(true)
            if (colNumber === 22 && cell.text === 'DEVOLUÇÃO')
                verifications.push(true)
        })
        
        return verifications.length === spreadsheet.getRow(1).cellCount ? true : false
    }

    async getAllEnterprises() {
        const spreadsheet = await this.getSpreadsheet();
        const enterpriseNames: string[] = []
        spreadsheet.getColumn(1).eachCell(cell => {
            enterpriseNames.push(cell.text)
        });
        return enterpriseNames;
    }
}

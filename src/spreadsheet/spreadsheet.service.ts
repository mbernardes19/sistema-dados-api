import { Injectable } from '@nestjs/common';
import { Workbook, Worksheet, Row } from 'exceljs'
import { UploadedFile } from 'src/data-management/data-management.controller';
import DataSeeder, { DataSeed } from 'src/data-management/interfaces/data-seeder';
import OrderDto from 'src/data-management/interfaces/order-dto';
import onlyUnique from '../../utils/array'
import OrderedItemDto from 'src/data-management/interfaces/ordered-item-dto';
import { differenceInMilliseconds, closestTo } from 'date-fns';

@Injectable()
export class SpreadsheetService implements DataSeeder {
    private wb = new Workbook()

    toDataSeed(spreadsheet: Worksheet): DataSeed {
        return {
            orders: this.getAllOrdersDto(spreadsheet),
        }
    }

    async toSpreadsheet (file: UploadedFile) {
        const workbook = await this.wb.xlsx.load(file.buffer);
        return workbook.getWorksheet(1);
    }

    isSpreadsheetValid(spreadsheet: Worksheet): boolean {
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
            if (colNumber === 13 && cell.text === 'Quant. Faturada')
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
            if (colNumber === 22 && cell.text === 'NÚMERO DE COLETA:')
                verifications.push(true)
        })
        
        return verifications.length === spreadsheet.getRow(1).cellCount ? true : false
    }

    private getAllOrdersDto(spreadsheet: Worksheet): OrderDto[] {
        const orderRecords = []
        spreadsheet.getColumn(3).eachCell(cell => {
            orderRecords.push(cell.text)
        });
        const orders = orderRecords.filter(onlyUnique)
        orders.shift();
        const orderNumbers = orders.filter(orderNumber => orderNumber !== 'Nr. Pedido' || orderNumber !== '')
        return orderNumbers.map(orderNumber => this.getOrder(spreadsheet, orderNumber))
    }

    private getOrder(spreadsheet: Worksheet, orderNumber: string): OrderDto {
        // 1 - Find order rows
        const orderRows = this.getOrderRows(spreadsheet, orderNumber);
        // 2 - Get other order data
        const enterpriseName = orderRows[0].getCell(1).text;
        const orderStatus = orderRows[0].getCell(2).text;
        const orderCode = orderRows[0].getCell(5).text;
        const emissionDate = new Date(orderRows[0].getCell(6).text);
        const OcNumber = orderRows[0].getCell(7).text;
        const OcItemNumber = orderRows[0].getCell(8).text;
        const billingPredictionDate = orderRows[0].getCell(17).text === '00/00/0000' ? null : new Date(orderRows[0].getCell(17).text);
        const collectionNumber = orderRows[0].getCell(21).text;
        const orderedItems = this.getOrdersOrderedItems(orderRows);
        const deliveryDate: Date = this.getFarestDeliveryDate(orderedItems)

        return {
            enterpriseName,
            orderNumber,
            orderedItems,
            orderStatus,
            orderCode,
            emissionDate,
            OcNumber,
            OcItemNumber,
            billingPredictionDate: billingPredictionDate,
            collectionNumber,
            deliveryDate: deliveryDate ? deliveryDate : null
        }
    }

    private getFarestDeliveryDate(orderedItemDto: OrderedItemDto[]): Date {
        let difference = 0;
        let farestDate = null;
        const ord = orderedItemDto.filter(orderedItem => orderedItem.deliveryDate && orderedItem.deliveryDate > new Date())
        if (ord.length > 0) {
            ord.map(item => {
                const diff = differenceInMilliseconds(item.deliveryDate, new Date());
                if (diff > difference) {
                    difference = diff;
                    farestDate = item.deliveryDate;
                }
            })
            return farestDate;
        } else {
            const dates = orderedItemDto.map(item => {
                if (item.deliveryDate)
                    return item.deliveryDate
            });
            farestDate = closestTo(new Date(), dates)
            if (!farestDate) {
                return null;
            }
            return farestDate
        }
      }

    private getOrderRows(spreadsheet: Worksheet, orderNumber: string): Row[]  {
        const orderRows: Row[] = []
        spreadsheet.eachRow(row => {
            if (row.findCell(3).text === orderNumber) {
                orderRows.push(row);
            }
        })
        return orderRows;
    }

    private getOrdersOrderedItems(orderRows: Row[]): OrderedItemDto[] {
        return orderRows.map(orderRow => {
            return {
                itemNumber: orderRow.getCell(9).text && !isNaN(parseInt(orderRow.getCell(9).text)) ? parseInt(orderRow.getCell(9).text) : 0,
                orderNumber: orderRow.getCell(3).text,
                status: orderRow.getCell(15).text,
                prodServInfo: {
                    code: orderRow.getCell(10).text,
                    name: orderRow.getCell(11).text,
                    complement: orderRow.getCell(20).text
                },
                requestedQuantity: parseInt(orderRow.getCell(12).text),
                billedQuantity: parseInt(orderRow.getCell(13).text),
                pendingQuantity: parseInt(orderRow.getCell(14).text),
                deliveryDate: orderRow.getCell(16).text ? new Date(orderRow.getCell(16).text) : null,
                invoiceNumber: orderRow.getCell(18).text ? orderRow.getCell(18).text : null,
                invoiceEmissionDate: orderRow.getCell(19).text ? new Date(orderRow.getCell(19).text) : null,
                collectNumber: orderRow.getCell(22).text ? orderRow.getCell(22).text : null
            }
        })
    }
}

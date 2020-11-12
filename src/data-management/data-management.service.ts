import { Injectable, Inject } from '@nestjs/common';
import { SpreadsheetService } from 'src/spreadsheet/spreadsheet.service';
import { UploadedFile } from './data-management.controller';
import { DataSeed } from './interfaces/data-seeder';
import { Repository } from 'typeorm';
import { Enterprise } from 'src/model/enterprise.entity';
import { Order } from 'src/model/order.entity';
import { Item } from 'src/model/item.entity';
import { ProdServInfo } from 'src/model/prod-serv-info.entity';
import { OrderedItem } from 'src/model/ordered-item.entity';
import OrderedItemDto from './interfaces/ordered-item-dto';

@Injectable()
export class DataManagementService {
  constructor(
    @Inject('SpreadsheetService')
    private readonly spreadsheetService: SpreadsheetService,
    @Inject('ORDER_REPOSITORY')
    private readonly orderRepository: Repository<Order>,
    @Inject('ORDERED_ITEM_REPOSITORY')
    private readonly orderedItemRepository: Repository<OrderedItem>,
  ) {}

  private dataSeed: DataSeed;
  private updateStatus = 'not running';

  async isDataFromXlsValid(xlsFile: UploadedFile): Promise<boolean> {
    const spreadsheet = await this.spreadsheetService.toSpreadsheet(xlsFile);
    return this.spreadsheetService.isSpreadsheetValid(spreadsheet);
  }

  async updateDataFromXls(xlsFile: UploadedFile, page: number): Promise<void> {
    this.updateStatus = 'running';
    const spreadsheet = await this.spreadsheetService.toSpreadsheet(xlsFile);
      // const totalRows = spreadsheet.rowCount; //36213
      // const toRemove = Math.round(totalRows / 4) //9053
      // console.log(page, spreadsheet.rowCount)
      // switch(page) {
      //   case 1:
      //     // Total 36213 A A A A
      //     spreadsheet.spliceRows(1, toRemove) // Total 27160 B A A A
      //     console.log(spreadsheet.rowCount)
      //     spreadsheet.spliceRows(1, toRemove) // Total 18107 B B A A
      //     console.log(spreadsheet.rowCount)
      //     spreadsheet.spliceRows(1, toRemove) // Total 9054 B B B A
      //     console.log(spreadsheet.rowCount)
      //     break;
      //     // Total last 9054
      //   case 2:
      //     // Total 36213
      //     spreadsheet.spliceRows(1, toRemove) // Total 27160 B A A A
      //     console.log(spreadsheet.rowCount)
      //     spreadsheet.spliceRows(1, toRemove) // Total 18107 B B A A
      //     console.log(spreadsheet.rowCount)
      //     spreadsheet.spliceRows(9053, toRemove) // Total 9054 B B A B
      //     console.log(spreadsheet.rowCount)
      //     break;
      //     // Total penultimo last 9054
      //   case 3:
      //     // Total 36213
      //     spreadsheet.spliceRows(1, toRemove) // Total 27160 B A A A
      //     console.log(spreadsheet.rowCount)
      //     spreadsheet.spliceRows(9053, toRemove) // Total 18107 B A B A
      //     console.log(spreadsheet.rowCount)
      //     spreadsheet.spliceRows(9053, toRemove) // Total 9054 B A B B
      //     console.log(spreadsheet.rowCount)
      //     break;
      //     // Total penultimo penultimo last 9054
      //   case 4:
      //     // Total 36213
      //     spreadsheet.spliceRows(9053, toRemove) // Total 27160 A B A A
      //     console.log(spreadsheet.rowCount)
      //     spreadsheet.spliceRows(9053, toRemove) // Total 18107 A B B A
      //     console.log(spreadsheet.rowCount)
      //     spreadsheet.spliceRows(9053, toRemove) // Total 9054 A B B B
      //     spreadsheet.spliceRows(1, 1);
      //     console.log(spreadsheet.rowCount)
      //     break;
      //     // Total penultimo penultimo last 9054

      // }
      // console.log(spreadsheet.rowCount)
      await this.clearDatabase()
      this.dataSeed = this.spreadsheetService.toDataSeed(spreadsheet);
      await this.populateOrders()
      this.updateStatus = 'done';
  }

  async clearDatabase(): Promise<void> {
    await this.orderedItemRepository.clear();
    await this.orderRepository.delete({});
  }

  private async populateOrders(): Promise<void> {
    const orders: Order[] = [];
    this.dataSeed.orders.map(data => {
      const order = new Order();
      order.OcItemNumber = data.OcItemNumber;
      order.OcNumber = data.OcNumber;
      order.billingPredictionDate = data.billingPredictionDate;
      order.collectionNumber = data.collectionNumber;
      order.emissionDate = data.emissionDate;
      order.orderCode = data.orderCode;
      order.orderNumber = data.orderNumber;
      order.orderStatus = data.orderStatus;
      order.orderedItems = this.createOrderedItems(data.orderedItems)
      order.enterprise = this.createEnterprise(data.enterpriseName);
      order.deliveryDate = data.deliveryDate;
      orders.push(order);
    })
    await this.orderRepository.save(orders);
    console.log('DONE!')
  }

  private createOrderedItems(orderedItemsDto: OrderedItemDto[]): OrderedItem[] {
    return orderedItemsDto.map(dto => {
      const item = new Item();
      item.number = dto.itemNumber;

      const prodServInfo = new ProdServInfo();
      prodServInfo.code = dto.prodServInfo.code;
      prodServInfo.name = dto.prodServInfo.name;
      prodServInfo.complement = dto.prodServInfo.complement;
      return {
        item: item,
        status: dto.status,
        prodServInfo,
        requestedQuantity: dto.requestedQuantity,
        billedQuantity: dto.billedQuantity,
        pendingQuantity: dto.pendingQuantity,
        deliveryDate: dto.deliveryDate,
        invoiceNumber: dto.invoiceNumber,
        invoiceEmissionDate: dto.invoiceEmissionDate,
        collectNumber: dto.collectNumber
    }
    })
  }

  async getUpdateStatus() {
    return this.updateStatus
  }

  async setUpdateStatus(status: string) {
    return this.updateStatus = status;
  }

  private createEnterprise(enterpriseName: string): Enterprise {
    const enterprise = new Enterprise();
    enterprise.name = enterpriseName
    return enterprise
  }

}

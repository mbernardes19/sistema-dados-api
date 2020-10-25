import { Injectable, Inject, Logger } from '@nestjs/common';
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
  ) {}

  private dataSeed: DataSeed;

  async importDataFromXls(xlsFile: UploadedFile): Promise<void> {
    const spreadsheet = await this.spreadsheetService.toSpreadsheet(xlsFile);
    const isValid = this.spreadsheetService.isSpreadsheetValid(spreadsheet);
    if (isValid) {
      this.dataSeed = this.spreadsheetService.toDataSeed(spreadsheet);
      await this.populateOrders();
    } else {
      throw new Error('Invalid spreadsheet structure');
    }
  }

  private async populateOrders(): Promise<void> {
    const orders: Order[] = [];
    this.dataSeed.orders.map(data => {
      const order = new Order();
      order.OcItemNumber = data.OcItemNumber;
      order.OcNumber = data.OcNumber;
      order.billDocNumber = data.billDocNumber;
      order.billingDate = data.billingDate;
      order.billingPredictionDate = data.billingPredictionDate;
      order.collectionNumber = data.collectionNumber;
      order.emissionDate = data.emissionDate;
      order.orderCode = data.orderCode;
      order.orderNumber = data.orderNumber;
      order.orderStatus = data.orderStatus;
      order.orderedItems = this.createOrderedItems(data.orderedItems)
      order.enterprise = this.createEnterprise(data.enterpriseName);
      orders.push(order);
    })
    Logger.log('ORDERS');
    Logger.log(orders[4]);
    Logger.log(orders[5]);
    await this.orderRepository.save(orders);
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
        availableQuantity: dto.availableQuantity,
        pendingQuantity: dto.pendingQuantity,
        deliveryDate: dto.deliveryDate
    }
    })
  }

  private createEnterprise(enterpriseName: string): Enterprise {
    const enterprise = new Enterprise();
    const id = Math.trunc(Math.random()*1000);
    enterprise.name = enterpriseName
    enterprise.id = id;
    return enterprise
  }

}

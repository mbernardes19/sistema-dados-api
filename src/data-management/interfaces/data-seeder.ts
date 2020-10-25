import EnterpriseDto from "./enterprise-dto";
import ItemDto from "./item-dto";
import OrderDto from "./order-dto";
import ProdServInfoDto from "./prod-serv-info-dto";
import OrderedItemDto from "./ordered-item-dto";

export interface DataSeed {
    enterprises?: EnterpriseDto[],
    items?: ItemDto[],
    prodServInfo?: ProdServInfoDto[],
    orders: OrderDto[],
    orderedItems?: OrderedItemDto[]
}

export default interface DataSeeder {
    toDataSeed: (dataSource: any) => DataSeed
}
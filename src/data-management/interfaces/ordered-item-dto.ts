import ProdServInfoDto from "./prod-serv-info-dto";

export default interface OrderedItemDto {
    orderNumber: string;
    itemNumber: number;
    id?: number;
    status: string;
    prodServInfo: ProdServInfoDto;
    requestedQuantity: number;
    billedQuantity: number;
    pendingQuantity: number;
    deliveryDate: Date;
    invoiceNumber: string;
    invoiceEmissionDate: Date;
}
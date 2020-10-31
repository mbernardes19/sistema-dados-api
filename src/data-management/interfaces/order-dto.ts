import OrderedItemDto from "./ordered-item-dto";
import UserDto from "./user.dto";

export default interface OrderDto {
    enterpriseName: string,
    orderNumber: string;
    orderStatus: string;
    orderCode: string;
    orderedItems: OrderedItemDto[];
    emissionDate: Date;
    OcNumber: string;
    OcItemNumber: string;
    billingPredictionDate: Date;
    billDocNumber: string;
    billingDate: Date;
    collectionNumber: string;
    user?: UserDto;
}
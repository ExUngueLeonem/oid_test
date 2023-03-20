export interface IUser {
    userId: string;
    isSupplier: boolean;
}

export interface IRegistrationValues {
    name: string;
    phone: string;
    email: string;
    password: string;
}

export interface IUserInfo {
    id: string,
    name: string,
    inn: string,
    email: string,
    phone: string
}

export interface ISupplier extends IUserInfo {
    removed: boolean;
    description: string;
    address: string;
}

export interface ICatalogItem {
    parent?: string;
    name: string;
    measure: string;
    description?: string;
    type?: string;
    images?: string;
    article?: number | null;
    removed?: boolean;
    price?: number;
    supplierId?: string;
    id: string;
}

export interface ICart {
    id: string;
    suppliers: ICartSupplier[]
}

export interface ICartSupplier {
    id: string;
    name: string;
    items: ICartItem[]
}

export interface ICartItem {
    id: string;
    name: string;
    price: number,
    cost: number,
    image: string | null;
    amount: number,
}

export interface IAddresses {
    addresses: IAddressItem[];
    default: string;
    id: string;
}

export interface IAddressItem {
    id?: string;
    city?: string;
    street?: string;
    house?: string;
    index?: number;
    building?: string;
    flat?: string;
    entrance?: string;
    floor?: string;
    doorPhone?: string;
}

export interface IOrder {
    id: string;
    number?: number;
    correlationOrderId?: string;
    created?: string;
    delivered?: string;
    status?: string;
    customer?: ICustomer;
    supplier: {
        id: string;
        name: string;
    }
}

interface ICustomer extends IUserInfo {
    address: IAddressItem;
}

export interface IOutcomingOrder {
    comment: string;
    customerId: string;
    customerAddressId: string;
    items: IOutcomingOrderItem[]
}

export interface IOutcomingOrderItem {
    id: string;
    supplierId: string;
    amount: number;
}
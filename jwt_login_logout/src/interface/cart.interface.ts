import { Document } from 'mongoose';
export type Tproduct = {
    product_id:string,
    quantity:number
}
export interface ICart extends Document{
    user_id: string,
    products?: [Tproduct],
    total?:number,
    status?:string
}

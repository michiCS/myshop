import { OrderItem } from './OrderItem';

export interface Order {
    id: number;
    timestamp: string;
    items: OrderItem[]
}
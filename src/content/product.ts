import { BaseContent } from './baseContent';

export interface Product extends BaseContent {
    name: string;
    description: string;
    price: number;
    tags?: string[];
}

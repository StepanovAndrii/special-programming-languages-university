import { Article } from '../content/article';
import { Product } from '../content/product';

export type ValidationResult = { valid: boolean; messages: string[] };

export function validateArticle(article: Article): ValidationResult {
    const errors: string[] = [];
    if (!article.title.trim()) errors.push('Title is required.');
    if (!article.content.trim()) errors.push('Content is required.');
    return { valid: errors.length === 0, messages: errors };
}

export function validateProduct(product: Product): ValidationResult {
    const errors: string[] = [];
    if (!product.name.trim()) errors.push('Product name is required.');
    if (!product.description.trim()) errors.push('Description is required.');
    if (product.price <= 0) errors.push('Price must be greater than zero.');
    return { valid: errors.length === 0, messages: errors };
}

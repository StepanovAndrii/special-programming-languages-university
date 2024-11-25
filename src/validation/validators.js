"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateArticle = validateArticle;
exports.validateProduct = validateProduct;
function validateArticle(article) {
    const errors = [];
    if (!article.title.trim())
        errors.push('Title is required.');
    if (!article.content.trim())
        errors.push('Content is required.');
    return { valid: errors.length === 0, messages: errors };
}
function validateProduct(product) {
    const errors = [];
    if (!product.name.trim())
        errors.push('Product name is required.');
    if (!product.description.trim())
        errors.push('Description is required.');
    if (product.price <= 0)
        errors.push('Price must be greater than zero.');
    return { valid: errors.length === 0, messages: errors };
}

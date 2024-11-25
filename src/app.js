"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const operations_1 = require("./content/operations");
const validators_1 = require("./validation/validators");
const versionControl_1 = require("./versioning/versionControl");
const articleService = (0, operations_1.createContentService)();
const productService = (0, operations_1.createContentService)();
// Example: Article operations
const newArticle = {
    id: 'a1',
    createdAt: new Date(),
    updatedAt: new Date(),
    status: 'draft',
    title: 'First Article',
    content: 'This is the content.',
    author: 'Author 1',
};
const addedArticle = articleService.add(newArticle);
console.log('Added article:', addedArticle);
const validation = (0, validators_1.validateArticle)(addedArticle);
console.log('Validation:', validation);
// Example: Versioning
const versionedArticle = (0, versionControl_1.initializeVersion)(addedArticle);
const updatedArticle = (0, versionControl_1.createVersion)(versionedArticle, { title: 'Updated Title' });
console.log('Versioned article:', updatedArticle);

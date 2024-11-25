import { createContentService } from './content/operations';
import { validateArticle, validateProduct } from './validation/validators';
import { initializeVersion, createVersion } from './versioning/versionControl';
import { hasPermission } from './accessControl/permissions';

import { Article } from './content/article';
import { Product } from './content/product';

const articleService = createContentService<Article>();
const productService = createContentService<Product>();

// Example: Article operations
const newArticle: Article = {
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

const validation = validateArticle(addedArticle);
console.log('Validation:', validation);

// Example: Versioning
const versionedArticle = initializeVersion(addedArticle);
const updatedArticle = createVersion(versionedArticle, { title: 'Updated Title' });
console.log('Versioned article:', updatedArticle);

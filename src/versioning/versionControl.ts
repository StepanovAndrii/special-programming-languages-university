import { BaseContent } from '../content/baseContent';

export interface Versioned<T extends BaseContent> extends BaseContent {
    version: number;
    history: T[];
}

export function initializeVersion<T extends BaseContent>(content: T): Versioned<T> {
    return {
        ...content,
        version: 1,
        history: [],
    };
}

export function createVersion<T extends BaseContent>(
    content: Versioned<T>,
    updates: Partial<T>
): Versioned<T> {
    const updatedContent: Versioned<T> = {
        ...content,
        ...updates,
        updatedAt: new Date(),
        version: content.version + 1,
        history: [...content.history, { ...content }],
    };
    return updatedContent;
}

import { BaseContent } from './baseContent';

export type ContentService<T extends BaseContent> = {
    add(content: T): T;
    get(id: string): T | null;
    modify(id: string, updates: Partial<T>): T | null;
    remove(id: string): boolean;
};

export function createContentService<T extends BaseContent>(): ContentService<T> {
    const storage: Map<string, T> = new Map();

    return {
        add(content: T): T {
            storage.set(content.id, content);
            return content;
        },
        get(id: string): T | null {
            return storage.get(id) || null;
        },
        modify(id: string, updates: Partial<T>): T | null {
            const existing = storage.get(id);
            if (!existing) return null;
            const updated = { ...existing, ...updates, updatedAt: new Date() };
            storage.set(id, updated);
            return updated;
        },
        remove(id: string): boolean {
            return storage.delete(id);
        },
    };
}

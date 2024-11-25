"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContentService = createContentService;
function createContentService() {
    const storage = new Map();
    return {
        add(content) {
            storage.set(content.id, content);
            return content;
        },
        get(id) {
            return storage.get(id) || null;
        },
        modify(id, updates) {
            const existing = storage.get(id);
            if (!existing)
                return null;
            const updated = { ...existing, ...updates, updatedAt: new Date() };
            storage.set(id, updated);
            return updated;
        },
        remove(id) {
            return storage.delete(id);
        },
    };
}

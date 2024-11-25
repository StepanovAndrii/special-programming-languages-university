"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeVersion = initializeVersion;
exports.createVersion = createVersion;
function initializeVersion(content) {
    return {
        ...content,
        version: 1,
        history: [],
    };
}
function createVersion(content, updates) {
    const updatedContent = {
        ...content,
        ...updates,
        updatedAt: new Date(),
        version: content.version + 1,
        history: [...content.history, { ...content }],
    };
    return updatedContent;
}

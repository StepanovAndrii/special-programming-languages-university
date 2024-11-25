"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasPermission = hasPermission;
function hasPermission(role, action, rules) {
    return !!rules[role]?.[action];
}

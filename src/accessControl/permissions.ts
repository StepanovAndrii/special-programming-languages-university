import { Role, Permission } from './roles';

export type AccessRules<T> = Record<Role, Partial<Permission>>;

export function hasPermission<T>(
    role: Role,
    action: keyof Permission,
    rules: AccessRules<T>
): boolean {
    return !!rules[role]?.[action];
}

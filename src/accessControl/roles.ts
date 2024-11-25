export type Role = 'admin' | 'editor' | 'viewer';

export type Permission = {
    canCreate: boolean;
    canRead: boolean;
    canUpdate: boolean;
    canDelete: boolean;
};

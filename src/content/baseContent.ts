export interface BaseContent {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    status: 'draft' | 'published' | 'archived';
}

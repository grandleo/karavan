import { UniqueIdentifier } from '@dnd-kit/core';

export interface BaseItem {
    id: UniqueIdentifier;
    [key: string]: any;
}

export interface SortableListProps<T extends BaseItem> {
    items: T[];
    onChange: (items: T[]) => void;
    onSortEnd?: (sortedIds: UniqueIdentifier[]) => void;
    renderItem: (item: T, index: number) => React.ReactNode;
}
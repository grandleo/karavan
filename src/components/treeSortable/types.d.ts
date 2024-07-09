import {UniqueIdentifier} from "@dnd-kit/core";
import {ReactNode} from "react";

interface BaseItem {
    id: UniqueIdentifier;
}

interface TreeSortableProps<T extends BaseItem> {
    items: T[];
    onChange: (items: T[]) => void;
    onSortEnd?: (ids: {}) => void;
    renderItem(item: T, index?: number): ReactNode;
}
// Определите тип контекста
import {createContext, ReactNode, useContext, useState} from "react";

interface WarehouseContextType {
    selectedWarehouse: string | null;
    setSelectedWarehouse: (warehouse: string | null) => void;
}

const WarehouseContext = createContext<WarehouseContextType | undefined>(undefined);

interface WarehouseProviderProps {
    children: ReactNode;
}

export const WarehouseProvider = ({ children } : WarehouseProviderProps) => {
    const [selectedWarehouse, setSelectedWarehouse] = useState<string | null>(null);

    return (
        <WarehouseContext.Provider value={{ selectedWarehouse, setSelectedWarehouse }}>
            {children}
        </WarehouseContext.Provider>
    );
}

export const useWarehouse = () => {
    const context = useContext(WarehouseContext);
    if (context === undefined) {
        throw new Error("useWarehouse must be used within a WarehouseProvider");
    }
    return context;
}
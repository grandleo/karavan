import {actions as supplierStockActions} from "@/store/slices/supplierStockSlice";
import {actions as categoryActions} from "@/store/slices/categorySlice";

export const rootActions = {
    ...supplierStockActions,
    ...categoryActions
}
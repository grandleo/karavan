import {actions as supplierStockActions} from "@/store/slices/supplierStockSlice";
import {actions as categoryActions} from "@/store/slices/categorySlice";
import {actions as stockActions} from "@/store/slices/stockClientSlice";
import {actions as adminSettingsActions} from "@/store/slices/adminSettingsSlice";

export const rootActions = {
    ...supplierStockActions,
    ...categoryActions,
    ...stockActions,
    ...adminSettingsActions,
}
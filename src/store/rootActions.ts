import {actions as supplierStockActions} from "@/store/slices/supplierStockSlice";
import {actions as categoryActions} from "@/store/slices/categorySlice";
import {actions as stockClientActions} from "@/store/slices/stockClientSlice";
import {actions as adminSettingsActions} from "@/store/slices/adminSettingsSlice";
import {actions as ordersActions} from "@/store/slices/ordersSlice";
import {actions as stockActions} from "@/store/slices/stockSlice";

export const rootActions = {
    ...supplierStockActions,
    ...categoryActions,
    ...stockClientActions,
    ...adminSettingsActions,
    ...ordersActions,
    ...stockActions
}
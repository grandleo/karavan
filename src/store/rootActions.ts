import {actions as supplierStockActions} from "@/store/slices/supplierStockSlice";
import {actions as categoryActions} from "@/store/slices/categorySlice";
import {actions as stockClientActions} from "@/store/slices/stockClientSlice";
import {actions as adminSettingsActions} from "@/store/slices/adminSettingsSlice";
import {actions as ordersActions} from "@/store/slices/ordersSlice";
import {actions as stockActions} from "@/store/slices/stockSlice";
import {actions as specificationsActions} from "@/store/slices/specificationsSlice";
import {actions as clientsActions} from "@/store/slices/clientSlice";
import {actions as logisticsActions} from "@/store/slices/logisticSlice";
import {actions as suppliersActions} from "@/store/slices/supplierSlice";
import {actions as adminsActions} from "@/store/slices/adminsSlice";
import {actions as producerCountryActions} from "@/store/slices/producerCountrySlice";

export const rootActions = {
    ...supplierStockActions,
    ...categoryActions,
    ...stockClientActions,
    ...adminSettingsActions,
    ...ordersActions,
    ...stockActions,
    ...specificationsActions,
    ...clientsActions,
    ...logisticsActions,
    ...suppliersActions,
    ...adminsActions,
    ...producerCountryActions
}
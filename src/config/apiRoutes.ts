//Общие роутеры
export const REGISTRATION_URL = 'registration'
export const CHECK_EMAIL_URL = 'check-email'
export const SEND_PIN_CODE_URL = 'send-pin-code'
export const CHECK_PIN_CODE = 'check-pin-code'
export const LOGIN_URL = 'login'
export const LOGOUT_URL = 'logout'

//Склады
export const GET_WAREHOUSES_USER = 'warehouses'
export const CREATE_WAREHOUSE_USER = 'warehouses/create'


//Админ роуты

//Характеристики
export const ADMIN_GET_SPECIFICATIONS = 'admin/specifications'
export const ADMIN_CREATE_SPECIFICATION_CREATE = 'admin/specifications/create'
export const ADMIN_CREATE_SPECIFICATION_UPDATE = 'admin/specifications/update'
export const ADMIN_CREATE_SPECIFICATION_DELETE = 'admin/specifications/delete'
export const ADMIN_GET_SPECIFICATION_VALUES = 'admin/specifications/get-values'
export const ADMIN_CREATE_SPECIFICATION_VALUES = 'admin/specifications/add-values'
export const ADMIN_DELETE_SPECIFICATION_VALUES = 'admin/specifications/delete-value'

//Категории
export const ADMIN_GET_CATEGORIES = 'admin/categories'
export const ADMIN_GET_CATEGORIES_CREATE = 'admin/categories/create'
export const ADMIN_GET_CATEGORIES_UPDATE = 'admin/categories/update'
export const ADMIN_GET_CATEGORIES_DELETE = 'admin/categories/delete'
export const ADMIN_GET_CATEGORY_SPECIFICATIONS = 'admin/categories/get-category-specifications'

//Товары
export const ADMIN_GET_PRODUCTS = 'admin/products'

export const ADMIN_PRODUCT_CREATE = 'admin/products/create'


//Поставщики
export const SUPPLIER_GET_ALL_PRODUCTS = 'supplier/stock'
export const SUPPLIER_SET_PRICE_PRODUCT_WAREHOUSE = 'supplier/stock/price'
export const SUPPLIER_SET_QTY_PRODUCT_WAREHOUSE = 'supplier/stock/qty'
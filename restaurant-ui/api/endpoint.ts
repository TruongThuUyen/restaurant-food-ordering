const END_POINT = {
  PRODUCT: {
    GET_PRODUCTS: (category?: string) =>
      category ? `/products?category=${category}` : '/products',
    GET_PRODUCT_BY_ID: (id: string) => `/products/${id}`,
  },
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    PROFILE: '/auth/profile',
  },
  CART: {
    GET_BY_USER_ID: `/cart`,
    ADD_TO_CART: '/cart/merge',
    DECREASE: '/cart/items/decrease',
    REMOVE_ITEM: '/cart/items/remove',
    REMOVE_ALL_ITEM: '/cart/remove-all',
  },
  CITY: {
    GET_ALL: `/cities`,
  },
  TABLE: {
    GET_TABLES_AVAILABLE: 'table/available',
    UPDATE_STATUS: '/table',
  },
  ORDER: {
    GET_ORDERS_LIST_BY_USERID: 'order/:id',
    ADD_ORDER_ITEM: '/orders',
  },
};

export default END_POINT;

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
  },
};

export default END_POINT;

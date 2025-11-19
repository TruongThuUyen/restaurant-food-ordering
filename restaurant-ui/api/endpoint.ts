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
};

export default END_POINT;

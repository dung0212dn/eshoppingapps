const cartInit = {
  cartItems: [],
  cartTotal: null,
  cartCount: null,
};

const CartReducer = (state = cartInit, action) => {
  switch (action.type) {
    case "SET_CART":
      return {
        cartItems: action.payload.cartItems,
        cartTotal: action.payload.cartTotal,
        cartCount: action.payload.cartItems.length,
      };
    case "ADD_TO_CART":
      const existingItemIndex = state.cartItems.findIndex(
        (item) =>
          item.product.id === action.payload.product.id &&
          item.sizes.id === action.payload.size &&
          item.colors.id === action.payload.color
      );
      if (existingItemIndex !== -1) {
        return { ...state };
      } else {
        return {
          ...state,
          cartCount: state.cartCount + 1,
        };
      }

    case "DELETE_CART":
      const updatedCart = state.cartItems.filter((item) => item.id !== action.payload.idDelete);
      const total = updatedCart.reduce(
        (acc, item) =>
          acc +
          item.product.price *
            (1 - item.product.discount / 100) *
            item.quantity,
        0
      );
      return {
        cartItems: updatedCart,
        cartTotal: total,
        cartCount: updatedCart.length - 1,
      };
    case "CHECK_OUT":
          return {
               cartItems: [],
               cartTotal: null,
               cartCount: null,
          }

    default:
      return state;
  }
};

export default CartReducer;

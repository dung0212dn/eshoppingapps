const FilterReducer = (state, action) => {
  switch (action.type) {
    case "FILTER_SORT_BY":
      return {
        ...state,
        sort_by: action.payload,
      };
      break;
    case "SET_MIN_PRICE":

      return {
        ...state,
        min_price: action.payload,
      };
      break;
    case "SET_MAX_PRICE":
      return {
        ...state,
        max_price: action.payload,
      };
      break;
    default:
      return state;
  }
};

export default FilterReducer;

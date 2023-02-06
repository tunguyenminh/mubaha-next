import {SET_PRODUCTS} from './actions'

const initialFilters = {
  limit:20,
  page:1,
  priceRange:{max:1000000,min:0},
  cateID:null,
  brand:null,
  location:null,
  products:[],
  totalPage:null,
  currentPage:null,
  totalProduct:null
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        products: [...state.products,...action.payload]
      }
    default:
      throw new Error(`invalid actions`)
  }
};

export{initialFilters}
export default reducer
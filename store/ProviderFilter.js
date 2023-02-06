import FilterContext from "./FilterContext";
import { useReducer } from "react";
import reducer,{initialFilters} from './reducer.js'
export default function ProviderFilter({children}){
  const [state,dispatch] = useReducer(reducer,initialFilters);
  return(
    <FilterContext.Provider value={[state,dispatch]}>
        {children}
    </FilterContext.Provider>
  )
}
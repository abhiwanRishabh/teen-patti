import { useHistory, useLocation } from "react-router-dom";

function useParamsChange() {
  const history = useHistory();
  const location = useLocation();
  const param = new URLSearchParams(location.search);

  // Update or add query parameter
  const setSearchParam = (params) => {
    for (const [paramName,paramValue] of Object.entries(params)) {
      // //("params",prop)
      param.set(paramName, paramValue);
      history.push(`?${param.toString()}`);
    }
  };

 
  
 // return 
  return [param, setSearchParam];
}

export default useParamsChange;
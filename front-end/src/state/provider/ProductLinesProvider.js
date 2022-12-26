import { useReducer } from "react";
import ProductLineContext from "../context/ProductLinesContext";
import { useProductLinesContext } from "../hook/hooks";
import handleUpdateProductLinesState, {
  initState as initPLStage,
} from "../reducer/ProductLinesReducer";
const ProductLinesProvider = ({ children }) => {
  const [productLines, updateProductLines] = useReducer(
    handleUpdateProductLinesState,
    initPLStage
  );
  return (
    <ProductLineContext.Provider value={[productLines, updateProductLines]}>
      {children}
    </ProductLineContext.Provider>
  );
};

export default ProductLinesProvider;

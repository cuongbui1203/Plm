import { Pagination } from "react-bootstrap";
import CardComponent from "../Card/Card";
import "../showProducts/productComponent.css";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useDataContext } from "../../state/hook/hooks";
import { setProduct } from "../../state/actions/DataActions";
const ProductLineComponent = ({ products }) => {
  const navig = useNavigate();
  const [product2, updateProduct] = useDataContext();

  return (
    <>
      {products.map((productLine, index) => {
        const handleClick = () => {
          updateProduct(setProduct(productLine));
          navig(`/home/product-line/${productLine.productLineId}`);
        };
        const product = {
          name: productLine.productLineId,
          subName: productLine.name,
          imgPath: productLine.imgPath,
        };
        return (
          <CardComponent
            key={productLine.productId}
            id={productLine.productId}
            element={product}
            handleClick={handleClick}
          />
        );
      })}
    </>
  );
};

ProductLineComponent.propTypes = {
  products: PropTypes.array.isRequired,
};

export default ProductLineComponent;

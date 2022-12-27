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
      {products.map((product, index) => {
        const handleClick = () => {
          updateProduct(setProduct(product));
          navig(`/home/product-line/${product.productLineId}`);
        };
        return (
          <CardComponent
            key={product.productId}
            id={product.productId}
            product={product}
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

import { Pagination } from "react-bootstrap";
import CardComponent from "../Card/Card";
import "./productComponent.css";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useDataContext } from "../../state/hook/hooks";
import { setProduct } from "../../state/actions/DataActions";
const ProductComponent = ({ products }) => {
  const navig = useNavigate();
  const [product2, updateProduct] = useDataContext();

  return (
    <>
      {products.map((product, index) => {
        const handleClick = () => {
          updateProduct(setProduct(product));
          navig(`/home/product/${product.productId}`);
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

ProductComponent.propTypes = {
  products: PropTypes.array.isRequired,
};

export default ProductComponent;

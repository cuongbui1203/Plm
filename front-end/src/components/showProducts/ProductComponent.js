import { Pagination } from "react-bootstrap";
import CardComponent from "../Card/Card";
import "./productComponent.css";
import PropTypes from "prop-types";
const ProductComponent = ({ products }) => {
  return (
    <>
      {products.map((product, index) => {
        return (
          <CardComponent
            key={product.productId}
            id={product.productId}
            product={product}
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

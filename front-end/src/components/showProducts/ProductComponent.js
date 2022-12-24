import { Pagination } from "react-bootstrap";
import CardComponent from "../pagination/Card";
import "./productComponent.css";
import PropTypes from "prop-types";
const ProductComponent = ({ products }) => {
  return (
    <>
      {products.map((card, index) => {
        return (
          <CardComponent
            id={card.productId}
            name={card.name}
            imageUrl=""
            productLine={card.productLine}
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

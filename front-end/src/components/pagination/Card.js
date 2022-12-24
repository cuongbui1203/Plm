import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import "./Card.css";

const CardComponent = ({ id, name, productLine, imageUrl }) => {
  return (
    <>
      <Card>
        <Card.Img variant="top" src={imageUrl} alt={id} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>{productLine}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

CardComponent.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  productLine: PropTypes.string.isRequired,
  // imageUrl: PropTypes.string.isRequired,
};

export default CardComponent;

import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { setProduct } from "../../state/actions/DataActions";
import { useDataContext } from "../../state/hook/hooks";
import "./Card.css";

const CardComponent = ({ id, element, handleClick }) => {
  const navig = useNavigate();

  const [product2, updateProduct] = useDataContext();

  const name = element.name;
  const productLine = element.subName;
  const imageUrl = process.env.REACT_APP_API_ENDPOINT + element.imgPath;
  // console.log(product);
  return (
    <div>
      <Card onClick={handleClick} className="card-container">
        <Card.Img variant="top" src={imageUrl} alt={id} />
        <Card.Body>
          <Card.Title
            className="card-title"
            // style={{
            //   overflow: "hidden",
            //   textOverflow: "ellipsis",
            //   display: "-webkit-box",
            //   "-webkit-line-clamp": 1 /* number of lines to show */,
            //   //  line-clamp: 2,
            //   "-webkit-box-orient": "vertical",
            // }}
          >
            {name}
          </Card.Title>
          <Card.Text>{productLine}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CardComponent;

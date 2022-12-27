import { Pagination } from "react-bootstrap";
import CardComponent from "../Card/Card";
import "../showProducts/productComponent.css";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useDataContext } from "../../state/hook/hooks";
import { setProduct } from "../../state/actions/DataActions";
const UsersComponent = ({ products }) => {
  const navig = useNavigate();
  const [product2, updateProduct] = useDataContext();

  return (
    <>
      {products.map((user, index) => {
        const handleClick = () => {
          updateProduct(setProduct(user));
          navig(`/home/profile/${user.id}`);
        };
        const tg = {
          name: user.name,
          subName: "<pre>Nơi Làm việc:\n</pre>" + user.workPlate,
          imgPath: user.imgPath,
        };
        return (
          <CardComponent
            key={user.id}
            id={user.id}
            element={tg}
            handleClick={handleClick}
          />
        );
      })}
    </>
  );
};

UsersComponent.propTypes = {
  products: PropTypes.array.isRequired,
};

export default UsersComponent;

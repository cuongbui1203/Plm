import { Pagination } from "react-bootstrap";
import CardComponent from "../Card/Card";
import "../showProducts/productComponent.css";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useDataContext } from "../../state/hook/hooks";
import { setProduct } from "../../state/actions/DataActions";
const WorkPlatesComponent = ({ workPlates }) => {
  const navig = useNavigate();
  const [product2, updateProduct] = useDataContext();

  return (
    <>
      {workPlates.map((workPlate, index) => {
        console.log(workPlates);
        console.log(workPlate);
        const handleClick = () => {
          navig(`/home/work-plate/${workPlate.id}`);
        };
        const tg = {
          name: workPlate.name,
          subName: "loại " + workPlate.loai,
          imgPath: "",
        };
        return (
          <CardComponent
            key={workPlate.id}
            id={workPlate.id}
            element={tg}
            handleClick={handleClick}
          />
        );
      })}
    </>
  );
};

WorkPlatesComponent.propTypes = {
  workPlates: PropTypes.array.isRequired,
};

export default WorkPlatesComponent;

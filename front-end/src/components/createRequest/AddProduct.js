import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Select from "react-select";
import { getAllProductApi, getAllProductLine } from "../../API/productApi";

const AddProduct = (handle, handleClose) => {
  const [data, setData] = useState([]);
  const [type, setType] = useState(0);
  const [sl, setSl] = useState(1);
  const [choose, setChoose] = useState({});
  const types = [
    {
      label: "Dòng sản phẩm",
      value: 1,
    },
    {
      label: "Sản phẩm",
      value: 2,
    },
  ];

  const onChangeType = (e) => {
    console.log(e.value);
    setData([]);
    setType(e.value);
    if (e.value === 1) {
      handleGetProductLine();
    } else {
      handleGetProduct();
    }
  };
  const handleChangeChoose = (e) => {
    setChoose(e.value);
  };
  const onChangeSL = (e) => {
    console.log(e.target.value);
  };
  const handleGetProduct = async () => {
    const response = await getAllProductApi();
    if (response.success) {
      const tg = [];
      response.data.map((e, index) => {
        tg.push({
          label: `Tên: ${e.name} | Dòng: ${e.productLine} | Status ${e.status}`,
          value: e.productId,
        });
      });
      setData(tg);
    }
  };

  const handleAdd = () => {
    const dataAdd = {
      id: choose,
      sl: sl,
    };
    // handle(dataAdd);
    handleClose();
  };

  const handleGetProductLine = async () => {
    const response = await getAllProductLine();
    if (response.success) {
      const tg = [];
      response.data.map((e, i) => {
        tg.push({
          label: `Tên: ${e.name}`,
          value: e.productLineId,
        });
      });
      setData(tg);
    }
  };

  return (
    <>
      <Modal.Header closeButton>Thêm</Modal.Header>
      <Modal.Body>
        <div>
          <label>Loại</label>
          <Select
            options={types}
            defaultValue={types[0].label}
            // className="bg-dark"
            // id="tetete"
            // styles={customStyles}
            onChange={onChangeType}
          />
          <div style={{ color: "red", height: "30px" }}>&#160;</div>
        </div>
        <div>
          <label>Chọn</label>
          <Select
            options={data}
            defaultValue={data[0]}
            isSearchable
            onChange={handleChangeChoose}
            // className="bg-dark"
            // id="tetete"
            // styles={customStyles}
          />
          <div style={{ color: "red", height: "30px" }}>&#160;</div>
        </div>
        {type === 1 && (
          <div>
            <label>Số Lượng</label>
            <br />
            <input
              type={"number"}
              hidden={false}
              style={{ width: "100%" }}
              // value={1}
              onChange={onChangeSL}
            />
            <div style={{ color: "red", height: "30px" }}>&#160;</div>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-danger"
          size="sm"
          style={{ marginRight: "5px" }}
          onClick={() => {
            handleClose();
          }}
        >
          Hủy
        </Button>
        <Button variant="outline-success" size="sm" onClick={handleAdd}>
          OK
        </Button>
      </Modal.Footer>
    </>
  );
};

export default AddProduct;

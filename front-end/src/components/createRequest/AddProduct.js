import { useState } from "react";
import Select from "react-select";
import { getAllProductApi, getAllProductLine } from "../../API/productApi";

const AddProduct = (handle) => {
  const [data, setData] = useState([]);
  const [type, setType] = useState(0);
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
        <label>Loại</label>
        <Select
          options={data}
          defaultValue={data[0]}
          isSearchable
          // className="bg-dark"
          // id="tetete"
          // styles={customStyles}
        />
        <div style={{ color: "red", height: "30px" }}>&#160;</div>
      </div>
      {type === 2 && (
        <div>
          <label>Loại</label>
          <br />
          <input
            type={"number"}
            hidden={false}
            style={{ width: "100%" }}
            value={1}
          />
          <div style={{ color: "red", height: "30px" }}>&#160;</div>
        </div>
      )}
    </>
  );
};

export default AddProduct;

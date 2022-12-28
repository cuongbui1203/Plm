import { MDBInput } from "mdb-react-ui-kit";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Select from "react-select";
import { createWorkPlateApi } from "../../API/Other";
import { isEmpty } from "../../hook/OtherHook";
import Notification from "../notification/notification";
const roles = [
  {
    label: "Ban Điều Hành",
    value: 1,
  },
  {
    label: "Nhà Máy",
    value: 2,
  },
  {
    label: "Trung Tâm Điều Phối",
    value: 3,
  },
  {
    label: "Trung Tâm Bảo Hành",
    value: 4,
  },
];

const CreateWorkPlate = ({ handleClose }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [roleId, setRoleId] = useState(0);
  const [validateMsg, setValidateMsg] = useState({});
  const onChangeName = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  };
  const onChangeAddress = (e) => {
    setAddress(e.target.value);
  };
  const onChangeRoleId = (e) => {
    setRoleId(Number(e.value));
  };

  const validateAll = () => {
    let i = 0;
    const msg = {};
    if (isEmpty(name)) {
      i++;
      msg.name = "Không được để trống";
    }
    if (isEmpty(address)) {
      i++;
      msg.address = "Không được để trống";
    }
    setValidateMsg(msg);
    return i === 0;
  };

  const handleCreateWP = async () => {
    if (!validateAll()) {
      return;
    }
    const data = new FormData();
    data.append("name", name);
    data.append("address", address);
    data.append("roleId", roleId);
    const response = await createWorkPlateApi(data);
    if (response.success) {
      Notification("success", "Tạo Work Plate thành công");
    } else {
      Notification("error", "Tạo Work Plate thất bại");
    }
    handleClose();
  };

  return (
    <>
      <div>
        <label>Name</label>
        <MDBInput
          // wrapperClass="mb-2"
          id="name"
          type="text"
          required
          size="lg"
          placeholder="Name"
          name="name"
          onChange={onChangeName}
        />
        <div style={{ color: "red", height: "1.5rem", paddingLeft: "2rem" }}>
          &#160;{validateMsg.name}
        </div>
      </div>
      <div>
        <label>address</label>
        <MDBInput
          // wrapperClass="mb-2"
          id="address"
          type="address"
          required
          size="lg"
          placeholder="address"
          name="address"
          onChange={onChangeAddress}
        />
        <div style={{ color: "red", height: "1.5rem", paddingLeft: "2rem" }}>
          &#160;{validateMsg.address}
        </div>
      </div>
      <div>
        <label>Loại</label>
        <Select
          defaultValue={roles[0]}
          options={roles}
          isSearchable={true}
          isClearable
          // styles={customStyles}
          onChange={onChangeRoleId}
        />
        <div style={{ color: "red", height: "1.5rem", paddingLeft: "2rem" }}>
          &#160;
        </div>
      </div>

      <div className="btn-container">
        <Button variant="secondary" className="mb-3 " onClick={handleClose}>
          cancel
        </Button>
        <Button
          variant="primary"
          className="mb-3 "
          onClick={handleCreateWP}
          // disabled={!validate}
        >
          Create
        </Button>
      </div>
    </>
  );
};

export default CreateWorkPlate;

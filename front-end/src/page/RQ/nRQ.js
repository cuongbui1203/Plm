import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useState } from "react";
import { getAllProductLine } from "../../API/productApi";
import { Button, Modal } from "react-bootstrap";
import { getRequestId, updateRequestApi } from "../../API/Other";
import Select from "react-select";
import Notification from "../../components/notification/notification";

const status = [
  {
    label: "Trạng thái",
    value: 0,
  },
  {
    label: "Mới sản xuất",
    value: 1,
  },
  {
    label: "Đưa về đại lý",
    value: 2,
  },
  {
    label: "Đã bán",
    value: 3,
  },
  {
    label: "Lỗi, cần bảo hành",
    value: 4,
  },
  {
    label: "Đang sửa chữa bảo hành",
    value: 5,
  },
  {
    label: "Đã bảo hành xong",
    value: 6,
  },
  {
    label: "Đã trả lại bảo hành cho khách hàng",
    value: 7,
  },
  {
    label: "Lỗi, cần trả về nhà máy",
    value: 8,
  },
  {
    label: "Lỗi, đã đưa về cơ sở sản xuất",
    value: 9,
  },
  {
    label: "Lỗi cần triệu hồi",
    value: 1,
  },
  {
    label: "Hết thời gian bảo hành",
    value: 1,
  },
  {
    label: "Trả lại cơ sở sản xuất",
    value: 1,
  },
];

const customStyles = {
  control: (base, state) => ({
    ...base,
    background: "#28292d",
    // match with the menu
    borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
  }),
  menu: (base) => ({
    ...base,
    // override border radius to match the box
    borderRadius: 0,
    // kill the gap
    marginTop: 0,
  }),
  menuList: (base) => ({
    ...base,
    // kill the white space on first and last option
    padding: 0,
    backgroundColor: "#555555",
    color: "red",
  }),
  singleValue: (style) => ({
    ...style,
    color: "red",
  }),
};

/**
 * Nhận
 * @returns
 */
export const NRQ = ({ data }) => {
  const [listRq, setListRQ] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [rq, setRq] = useState();
  const [idStatus, setIdStatus] = useState(1);
  const [showIdStatus, setShowIdStatus] = useState(false);
  useEffect(() => {
    const tg = [];
    data?.map((e, i) => {
      const data = JSON.parse(e.data);
      const tgg = {
        id: e.id,
        receiver: e.sender,
        title: data.title,
        status: e.accepted,
      };
      tg.push(tgg);
    });
    setListRQ(tg);
  }, [data]);

  const handleAccept = async () => {
    const data = {
      data: "accept",
      status: idStatus,
    };
    const response = await updateRequestApi(rq.id, data);
    if (response.success) {
      Notification("success", "thanh cong");
    } else {
      Notification("error", "that bai");
    }
    setShowModal(false);
    setShowIdStatus(false);
  };
  const handleReject = async () => {
    const data = {
      data: "reject",
      status: idStatus,
    };
    const response = await updateRequestApi(rq.id, data);
    if (response.success) {
      Notification("success", "thanh cong");
    } else {
      Notification("error", "that bai");
    }
    setShowModal(false);
  };

  const showBtn = (status) => {
    if (status === "pending") {
      return (
        <>
          <Button
            variant="outline-danger"
            size="sm"
            style={{ marginRight: "5px" }}
            onClick={handleReject}
          >
            Reject
          </Button>
          <Button
            variant="outline-success"
            size="sm"
            onClick={() => setShowIdStatus(true)}
          >
            Accept
          </Button>
        </>
      );
    } else {
      return (
        <>
          <Button
            variant="outline-danger"
            size="sm"
            style={{ marginRight: "5px" }}
          >
            Xoá
          </Button>
          <Button
            variant="outline-success"
            size="sm"
            onClick={() => setShowModal(false)}
            // onClick={handleSendRQ}
          >
            Đóng
          </Button>
        </>
      );
    }
  };

  const showStatus = (v) => {
    switch (v) {
      case "request":
        return <span class="badge badge-primary">REQUEST</span>;
      case "pending":
        return <span class="badge badge-secondary">PENDING</span>;
      case "accepted":
        return <span class="badge badge-success">ACCEPTED</span>;
      default:
        return <span class="badge badge-danger">REJECT</span>;
    }
  };

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>STT</th>
            <th>Người gửi</th>
            <th>Tiêu đề</th>
            <th>Trạng Thái</th>
            <th>Chi tiết</th>
          </tr>
        </thead>
        <tbody>
          {listRq?.map((prd, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{prd.receiver}</td>
                <td>{prd.title}</td>
                <td>{prd.status}</td>

                <td>
                  <Button
                    key={index + 1}
                    onClick={() => {
                      getRequestId(prd.id).then((res) => {
                        console.log(res.data[0][0].id);
                        const date = new Date(res.data[0][0].created_at);
                        const metaData = JSON.parse(res.data[0][0].data);
                        setRq({
                          id: res.data[0][0].id,
                          sender: res.data[0][0].sender,
                          receiver: res.data[0][0].Receiver,
                          title: metaData.title,
                          para: metaData.para,
                          data: metaData.data,
                          status: prd.status,
                          createTime: `${date.getDay()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
                        });
                        console.log({
                          sender: res.data[0][0].sender,
                          receiver: res.data[0][0].Receiver,
                          title: metaData.title,
                          para: metaData.para,
                          data: metaData.data,
                          status: prd.status,
                          createTime: `${date.getDay()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
                        });
                        setShowModal(true);
                        // console.log(rq);
                      });
                    }}
                  >
                    Chi tiết
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Body>
          <div id="wrapper">
            <div className="box">
              <div className="form">
                <h3>Yêu cầu</h3>

                <div className="form-group">
                  <label style={{ color: "#45f3ff" }}>Thời gian:</label>
                  <label style={{ color: "#45f3ff" }}>
                    &nbsp;{rq?.createTime}
                  </label>
                </div>

                <div className="form-group">
                  <label style={{ color: "#45f3ff" }}>Người Gửi:</label>
                  <label style={{ color: "#45f3ff" }}>&nbsp;{rq?.sender}</label>
                </div>
                <div className="form-group">
                  <label style={{ color: "#45f3ff" }}>Nơi Nhận </label>
                  <label style={{ color: "#45f3ff" }}>
                    &nbsp;
                    {rq?.receiver}
                  </label>
                </div>

                <div className="form-group">
                  <label style={{ color: "#45f3ff" }}>Tiêu đề</label>
                  <label style={{ color: "#45f3ff" }}>&nbsp;{rq?.title}</label>
                </div>

                <div className="form-group">
                  <label style={{ color: "#45f3ff" }}>Nội dung</label>
                  <label style={{ color: "#45f3ff" }}>&nbsp;{rq?.para}</label>
                </div>

                {rq?.data.length && (
                  <div className="form-group tbl-cr">
                    <Table
                      striped
                      bordered
                      hover
                      variant="dark"
                      size="sm"
                      className="tb-cr"
                    >
                      <thead>
                        <tr>
                          <th>STT</th>
                          <th>ID</th>
                          <th>Sl</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rq?.data.map((e, i) => {
                          return (
                            <tr>
                              <td>{i + 1}</td>
                              <td>{e.id}</td>
                              <td>{e.sl}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </div>
                )}
                <div className="form-group">
                  <label style={{ color: "#45f3ff" }}>Trạng Thái</label>
                  <label style={{ color: "#45f3ff" }}>&nbsp;{rq?.status}</label>
                </div>
                <div align="end">{showBtn(rq?.status)}</div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={showIdStatus}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        onHide={() => setShowIdStatus(false)}
      >
        <Modal.Header>Chọn trạng thái</Modal.Header>
        <Modal.Body>
          <div>
            <Select
              options={status}
              isSearchable={true}
              defaultValue={status[0]}
              onChange={(e) => {
                setIdStatus(e.value);
              }}
              //   setLoaiRq(e.value);
              size="sm"
              // }}
              // styles={customStyles}
            />
            <i></i>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <>
            <Button
              variant="outline-danger"
              size="sm"
              style={{ marginRight: "5px" }}
              onClick={() => setShowIdStatus(false)}
            >
              Huỷ
            </Button>
            <Button
              variant="outline-success"
              size="sm"
              // onClick={() => setShowModal(false)}
              onClick={handleAccept}
            >
              ok
            </Button>
          </>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "../../components/createRequest/CR.css";
import { deleteRequestApi, getRequestId } from "../../API/Other";
import Notification from "../../components/notification/notification";
/**
 * Gửi
 * @returns
 */
export const CrRQ = ({ data, getRQ }) => {
  const [listRQ, setListRQ] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [rq, setRq] = useState();
  console.log(data);
  useEffect(() => {
    const tg = [];
    data?.map((e, i) => {
      const data = JSON.parse(e.data);
      const tgg = {
        id: e.id,
        receiver: e.Receiver,
        title: data.title,
        status: e.accepted,
      };
      tg.push(tgg);
    });
    setListRQ(tg);
  }, [data]);

  const handeDelete = async () => {
    const response = await deleteRequestApi(rq.id);
    if (response.success) {
      Notification("success", "Thanh cong");
    } else {
      Notification("error", "That bai");
    }
    setShowModal(false);
    getRQ();
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
            <th>Nơi nhận</th>
            <th>Tiêu đề</th>
            <th>Trạng Thái</th>
            <th>Chi tiết</th>
          </tr>
        </thead>
        <tbody>
          {listRQ.map((prd, index) => {
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
                        console.log(res.data);
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
                  <p style={{ color: "#45f3ff" }}>{rq?.createTime}</p>
                </div>
                <div className="form-group">
                  <label style={{ color: "#45f3ff" }}>Người Gửi:</label>
                  <p style={{ color: "#45f3ff" }}>{rq?.sender}</p>
                </div>
                <div className="form-group">
                  <label style={{ color: "#45f3ff" }}>Nơi Nhận</label>
                  <p style={{ color: "#45f3ff" }}>{rq?.receiver}</p>
                </div>

                <div className="form-group">
                  <label style={{ color: "#45f3ff" }}>Tiêu đề</label>
                  <p style={{ color: "#45f3ff" }}>{rq?.title}</p>
                </div>

                <div className="form-group">
                  <label style={{ color: "#45f3ff" }}>Nội dung</label>
                  <p style={{ color: "#45f3ff" }}>{rq?.para}</p>
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
                  <p style={{ color: "#45f3ff" }}>{rq?.status}</p>
                </div>

                <div align="end">
                  <Button
                    variant="outline-danger"
                    size="md"
                    style={{ marginRight: "5px" }}
                    onClick={handeDelete}
                  >
                    Xoá
                  </Button>
                  <Button
                    variant="outline-success"
                    size="md"
                    style={{ marginRight: "5px" }}
                    onClick={() => setShowModal(false)}
                  >
                    Đóng
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

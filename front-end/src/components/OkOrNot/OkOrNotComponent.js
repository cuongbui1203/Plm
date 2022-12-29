import { Button, Modal } from "react-bootstrap";

const OkOrNot = ({ show, handle, handleClose, noiDung }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>Xác Nhận</Modal.Header>
      <Modal.Body>{noiDung}</Modal.Body>
      <Modal.Footer>
        <Button variant="outline-success" size="sm" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="outline-danger"
          size="sm"
          style={{ marginRight: "5px" }}
          onClick={handle}
        >
          Ok
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OkOrNot;

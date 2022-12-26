import React from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "../registerForm/registerForm.css"

export const ChangePass = () => {
  return (
    <div
      style={{
        maxWidth: "400px",
        maxHeight: "600px",
        border: "2px solid black",
        borderRadius: "10px",
        padding: "2px",
      }}
    >
      <div style={{ margin: "20px", padding: "2px" }}>
        <div className="form-group">
          <input
            type="password"
            name="password"
            className="register"
            required
          />
          <span>Mật khẩu cũ</span>
          <i></i>
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            className="register"
            required
          />
          <span>Mật khẩu mới</span>
          <i></i>
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            className="register"
            required
          />
          <span>Nhập lại mật khẩu</span>
          <i></i>
        </div>
        <Button variant="primary" size="sm">
          Đổi
        </Button>
      </div>
    </div>
  );
};

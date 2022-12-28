import { DSP, SP, TK, WP } from "../state/constants";

const ThongBao = {
  label: "Thông Báo",
  link: "/home/request",
  const: "",
};

const Executive_Board = {
  title: "Ban Điều Hành",
  options: [
    {
      label: "Dòng sản phẩm",
      link: "/home/product-lines",
      const: DSP,
    },
    {
      label: "Sản phẩm",
      link: "/home/products",
      const: "",
    },
    {
      label: "Quản lý tài khoản",
      link: "/home/users",
      const: TK,
    },
    {
      label: "Work plate",
      link: "/home/work-plate",
      const: WP,
    },
    {
      label: "Thống kê",
      link: "/home/statistical",
      const: "",
    },
  ],
};
const Factory = {
  title: "Nhà Máy",
  options: [
    {
      label: "Quản lý Sản phẩm",
      link: "/home/products",
      const: SP,
    },
    {
      label: "Thống kê",
      link: "/factory/statistical",
      const: "",
    },
  ],
};
const Shop = {
  title: "Trung tâm phân phối",
  options: [
    {
      label: "Quản lý sản phẩm",
      link: "/home/products",
      const: "",
    },
    {
      label: "Thống Kê",
      link: "/shop/statistical",
      const: "",
    },
  ],
};
const TTBH = {
  title: "Trung tâm bảo hành",
  options: [
    {
      label: "quản lý sản phẩm",
      link: "/home/products",
      const: "",
    },
    {
      label: "Thống Kê",
      link: "/bao-hanh/statistical",
      const: "",
    },
  ],
};
export { Executive_Board, Factory, Shop, TTBH };

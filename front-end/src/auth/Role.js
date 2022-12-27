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
      label: "Sản phẩm",
      link: "/home/products",
      const: "",
    },
    {
      label: "Dòng sản phẩm",
      link: "/home/product-lines",
      const: DSP,
    },
    {
      label: "quản lý tài khoản",
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
      title: "Quản lý sản phẩm",
      link: "/home/products",
      const: "",
    },
    {
      title: "Thống Kê",
      link: "/shop/statistical",
    },
  ],
};
const TTBH = {
  title: "Trung tâm bảo hành",
  options: [
    {
      title: "quản lý sản phẩm",
      link: "",
    },
    {
      title: "Thống Kê",
      link: "/bao-hanh/statistical",
    },
  ],
};
export { Executive_Board, Factory, Shop, TTBH };

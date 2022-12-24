import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { getAllProductApi } from "../../API/productApi";
import Notification from "../../components/notification/notification";
import PaginationComponent from "../../components/pagination/Pagination";
import ProductComponent from "../../components/showProducts/ProductComponent";
import { data } from "../../data";
import { handleGetAllProduct } from "../../hook/productHook";
import { HeaderBar, SideBar } from "../../layout";
import "./Product.css";

function Product() {
  const [state, dispatch] = useState([]);
  // const [state,dispatch] = useStore()
  async function getProduct() {
    let response = await getAllProductApi();
    // dispatch(actions.setLoading(''))
    if (response.success) {
      Notification("success", "Get All Product Success");
      // console.log(response.data);
      dispatch(response.data);
    } else {
      Notification("error", "Get All Product Fail");
    }
  }

  return (
    <div>
      <Container className="product">
        {/* <div> */}
        <ProductComponent products={state} />;
        {/* <PaginationComponent state/> */}
        {/* </div> */}
      </Container>
    </div>
  );
}

export default Product;

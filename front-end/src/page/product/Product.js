import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { getAllProductApi } from "../../API/productApi";
import Notification from "../../components/notification/notification";
import PaginationComponent from "../../components/pagination/Pagination";
import ProductComponent from "../../components/showProducts/ProductComponent";
import { data, testProduct } from "../../data";
import { handleGetAllProduct } from "../../hook/productHook";
import { HeaderBar, SideBar } from "../../layout";
import "./Product.css";

function Product() {
  const [products, setProduct] = useState(testProduct);
  const allProductCount = products.length;
  const [ProductPerPage, setProductPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  // const scrollPosition = useScroll();

  const lastSessionNumber = currentPage * ProductPerPage;
  const firstSessionIndex = lastSessionNumber - ProductPerPage;
  const limitedProduct = products.slice(firstSessionIndex, lastSessionNumber);
  // const [state,dispatch] = useStore()
  async function getProduct() {
    let response = await getAllProductApi();
    // dispatch(actions.setLoading(''))
    if (response.success) {
      Notification("success", "Get All Product Success");
      console.log(response.data);
      // setProduct(response.data);
      // console.log(products);
    } else {
      Notification("error", "Get All Product Fail");
    }
  }

  return (
    <div>
      <div>
        <Button onClick={getProduct}>btn</Button>
      </div>
      <Container className="product">
        <ProductComponent products={limitedProduct} />
      </Container>
      <PaginationComponent
        itemsCount={allProductCount}
        currentPage={currentPage}
        itemsPerPage={ProductPerPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default Product;

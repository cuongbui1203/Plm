import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { getAllProductApi } from "../../API/productApi";
import Notification from "../../components/notification/notification";
import PaginationComponent from "../../components/pagination/Pagination";
import ProductComponent from "../../components/showProducts/ProductComponent";
import { useDataContext, useLoginContext } from "../../state/hook/hooks";
import "./Product.css";

function Product() {
  const [products, setProduct] = useState([]);
  const allProductCount = products.length;
  const [ProductPerPage, setProductPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  // const scrollPosition = useScroll();
  const [loginState, updateLoginState] = useLoginContext();
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

      response.data.forEach((e) => {
        e.imgUrl = process.env.REACT_APP_API_ENDPOINT + e.imgPath;
      });
      const tg = [];
      response.data.map((e, i) => {
        if (e.visit === loginState.user.workPlateId) {
          tg.push(e);
        }
      });
      setProduct(tg);
      // await handleGetPlImage(response.data);
      // console.log(products);
    } else {
      Notification("error", "Get All Product Fail");
    }
  }

  useEffect(() => {
    getProduct().then((res) => {
      console.log(products);
      setCurrentPage(1);
    });
  }, []);
  // useEffect(() => {}, [products]);
  return (
    <div>
      <div>
        <Button onClick={getProduct}>Lấy toàn bộ sản phẩm</Button>
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
